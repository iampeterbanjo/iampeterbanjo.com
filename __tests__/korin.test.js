const Hapi = require('hapi');
const { expect } = require('code');
const {
	test,
	after,
	afterEach,
	before,
	beforeEach,
	suite,
} = (exports.lab = require('lab').script());
const sinon = require('sinon');
const got = require('got');
const {
	getLyrics,
	getTopTracks,
	lyricsIdPath,
} = require('../server/korin/methods');
const Lyricist = require('lyricist');
const jsonata = require('jsonata');
const nock = require('nock');
const readFile = require('util').promisify(require('fs').readFile);

suite('korin/profile/{artist}/{song}', () => {
	let server = new Hapi.Server();

	before(async ({ context }) => {
		context.lyrics = await readFile(`${__dirname}/fixtures/lyrics.txt`);
		context.profile = require('./fixtures/personality-profile.json');

		const getLyrics = sinon.stub().resolves(context.lyrics);
		context.getPersonalityProfile = sinon.stub().resolves(context.profile);
		context.personalityProfileApi = sinon.stub();

		const { getPersonalityProfile, personalityProfileApi } = context;

		await server.register({
			plugin: require('../server/korin/api'),
			options: {
				getLyrics,
				getPersonalityProfile,
				personalityProfileApi,
			},
		});
	});

	test('api returns profile', async ({ context }) => {
		const { result } = await server.inject({
			method: 'GET',
			url: '/korin/profile/Kendrik Lamar/Humble',
		});

		expect(result).to.equal(context.profile);
	});

	test('profile method is called with personality api', async ({ context }) => {
		await server.inject({
			method: 'GET',
			url: '/korin/profile/Kendrik Lamar/Humble',
		});

		const { lyrics, personalityProfileApi, getPersonalityProfile } = context;
		const [first] = getPersonalityProfile.args[0];
		expect(first).to.equal({ personalityProfileApi, lyrics });
	});
});

suite('korin/songs', () => {
	let server = new Hapi.Server();

	before(async ({ context }) => {
		context.artists = require('./fixtures/lastfm-topTracks.json');
		const mockGetArtists = sinon.stub().resolves(context.artists);

		await server.register({
			plugin: require('../server/korin/api'),
			options: { getTopTracks: mockGetArtists, getLyrics: () => {} },
		});
	});

	test('api request returns expected response', async ({ context }) => {
		const { result } = await server.inject({
			method: 'GET',
			url: '/korin/songs',
		});
		expect(result).to.equal(context.artists);
	});
});

suite('getLyrics', () => {
	const geniusApi = got.extend({ baseUrl: '/' });
	const lyricist = new Lyricist(`FAKE-TOKEN`);

	before(async ({ context }) => {
		context.data = require('./fixtures/genius-search.json');
		context.lyrics = await readFile(`${__dirname}/fixtures/lyrics.txt`);

		sinon.stub(geniusApi, 'get').resolves({ body: context.data });
		sinon.stub(lyricist, 'song').resolves({ lyrics: context.lyrics });
	});

	after(() => {
		sinon.restore();
	});

	test('returns expected lyrics', async ({ context }) => {
		const result = await getLyrics({ geniusApi, lyricist });

		expect(result).to.equal(context.lyrics);
	});

	[
		'Jump Kriss kross',
		'Humble Kendric Lamar',
		'Big House Audio Andrenaline',
	].forEach(term => {
		test(`geniusApi is called with search ${term}`, async () => {
			const query = new URLSearchParams([['q', term]]);

			await getLyrics({ geniusApi, lyricist }, term);

			const [first, second] = geniusApi.get.args[0];

			expect(first).to.be.equal('/search');
			expect(second).to.be.equal({ query });
		});
	});

	test('lyricist is called with songId and fetchLyrics', async ({
		context,
	}) => {
		await getLyrics({ geniusApi, lyricist }, '');

		const [first, second] = lyricist.song.args[0];
		const songId = jsonata(lyricsIdPath).evaluate(context.data);

		expect(first).to.be.equal(songId);
		expect(second).to.be.equal({ fetchLyrics: true });
	});
});

suite('getTopTracks', () => {
	const apiKey = `FAKE_API_KEY`;
	const baseUrl = process.env.LASTFM_API_URL;
	const lastfmApi = got.extend({ baseUrl, apiKey });

	beforeEach(async ({ context }) => {
		context.apiKey = apiKey;
		context.baseUrl = baseUrl;
		context.data = JSON.stringify(require('./fixtures/lastfm-topTracks.json'));

		await nock(context.baseUrl)
			.get('/')
			.query({
				method: 'chart.getTopTracks',
				format: 'json',
				api_key: lastfmApi.defaults.options.apiKey,
			})
			.reply(200, context.data);
	});

	afterEach(() => {
		sinon.restore();
		nock.cleanAll();
	});

	test('returns expected artists', async ({ context }) => {
		const result = await getTopTracks({ lastfmApi });

		expect(result).to.equal(context.data);
	});
});
