const Hapi = require('hapi');
const sinon = require('sinon');
const got = require('got');
const Lyricist = require('lyricist');
const jsonata = require('jsonata');
const nock = require('nock');
const { expect } = require('code');
const {
	test,
	after,
	afterEach,
	before,
	beforeEach,
	suite,
} = (exports.lab = require('lab').script());
const { readFile } = require('fs-extra');
const { mediaType: getMediaType } = require('accept');

const topTracks = require('./fixtures/lastfm-topTracks.json');
const profile = require('./fixtures/personality-profile.json');
const geniusSearch = require('./fixtures/genius-search.json');

const {
	getLyrics,
	getTopTracks,
	lyricsIdPath,
} = require('../../server/korin/methods');
const korinApi = require('../../server/korin/api');

const setup = async options => {
	const server = new Hapi.Server();

	const lyrics = await readFile(`${__dirname}/fixtures/lyrics.txt`);
	const getLyrics = sinon.stub().resolves(lyrics);
	const getPersonalityProfile = sinon.stub().resolves(profile);
	const personalityProfileApi = sinon.stub();
	const getTopTracks = sinon.stub().resolves(topTracks);

	const defaults = {
		getLyrics,
		getTopTracks,
		getPersonalityProfile,
		getMediaType,
		personalityProfileApi,
	};

	await server.register({
		plugin: korinApi,
		options: {
			...defaults,
			...options,
		},
	});

	return {
		server,
		lyrics,
		profile,
		topTracks,
		...defaults,
	};
};

suite('korin/profile/{artist}/{song}', () => {
	test('api returns profile', async () => {
		const { server, profile } = await setup();
		const { result } = await server.inject({
			method: 'GET',
			url: '/korin/profile/Kendrik Lamar/Humble',
		});

		expect(result).to.equal(profile);
	});

	test('profile method is called with personality api', async ({ context }) => {
		const {
			server,
			lyrics,
			personalityProfileApi,
			getPersonalityProfile,
		} = await setup();
		await server.inject({
			method: 'GET',
			url: '/korin/profile/Kendrik Lamar/Humble',
		});

		const [first] = getPersonalityProfile.args[0];
		expect(first).to.equal({ personalityProfileApi, lyrics });
	});
});

suite('korin/songs', () => {
	test('api request returns expected response', async ({ context }) => {
		const { server, topTracks } = await setup();
		const { result } = await server.inject({
			method: 'GET',
			url: '/korin/songs',
		});
		expect(result).to.equal(topTracks);
	});
});

suite('getLyrics', () => {
	const geniusApi = got.extend({ baseUrl: '/' });
	const lyricist = new Lyricist(`FAKE-TOKEN`);

	before(async ({ context }) => {
		context.data = geniusSearch;
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
		context.data = JSON.stringify(topTracks);

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
