const Hapi = require('hapi');
const { expect } = require('code');
const {
	test,
	after,
	before,
	describe,
} = (exports.lab = require('lab').script());
const sinon = require('sinon');
const got = require('got');
const {
	getLyrics,
	getArtists,
	lyricsIdPath,
} = require('../server/korin/methods');
const Lyricist = require('lyricist');
const jsonata = require('jsonata');

describe('korin/lyrics', () => {
	let server = new Hapi.Server();

	before(async ({ context }) => {
		context.lyrics = 'We wish you a merry christmas';
		const mockGetLyrics = sinon.stub().resolves(context.lyrics);

		await server.register({
			plugin: require('../server/korin/api'),
			options: { getLyrics: mockGetLyrics },
		});
	});

	test('api request returns expected response', async ({ context }) => {
		const { result } = await server.inject({
			method: 'GET',
			url: '/korin/lyrics',
		});
		expect(result).to.equal(context.lyrics);
	});
});

describe('korin/artists', () => {
	let server = new Hapi.Server();

	before(async ({ context }) => {
		context.artists = ['Beyonce', 'Cardi B'];
		const mockGetArtists = sinon.stub().resolves(context.artists);

		await server.register({
			plugin: require('../server/korin/api'),
			options: { getArtists: mockGetArtists, getLyrics: () => {} },
		});
	});

	test('api request returns expected response', async ({ context }) => {
		const { result } = await server.inject({
			method: 'GET',
			url: '/korin/artists',
		});
		expect(result).to.equal(context.artists);
	});
});

describe('getLyrics', () => {
	const geniusApi = got.extend({ baseUrl: '/' });
	const lyricist = new Lyricist(`FAKE-TOKEN`);

	before(({ context }) => {
		const id = 44444444;
		context.data = JSON.stringify({
			response: {
				hits: [
					{
						result: {
							id,
						},
					},
				],
			},
		});

		context.lyrics = 'Here comes the hot stepper';
		sinon.stub(geniusApi, 'get').resolves({ body: context.data });
		sinon.stub(lyricist, 'song').resolves({ lyrics: context.lyrics });
	});

	after(() => {
		sinon.restore();
	});

	test('getLyrics returns expected lyrics', async ({ context }) => {
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
		const songId = jsonata(lyricsIdPath).evaluate(JSON.parse(context.data));

		expect(first).to.be.equal(songId);
		expect(second).to.be.equal({ fetchLyrics: true });
	});

	describe('getArtists', () => {
		const lastfmApi = got.extend({ baseUrl: '/' });

		before(({ context }) => {
			context.artists = ['Beyonce', 'Cardi B'];
			sinon.stub(lastfmApi, 'get').resolves({ body: context.artists });
		});

		after(() => {
			sinon.restore();
		});

		test('getArtists returns expected artists', async ({ context }) => {
			const result = await getArtists({ lastfmApi });

			expect(result).to.equal(context.Artists);
		});
	});
});
