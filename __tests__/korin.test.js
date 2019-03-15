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
const { getLyrics, lyricsIdPath } = require('../server/korin/methods');
const Lyricist = require('lyricist');
const jsonata = require('jsonata');

let server = new Hapi.Server();

describe('api', () => {
	before(async ({ context }) => {
		context.lyrics = 'We wish you a merry christmas';
		const mockGetLyrics = sinon.stub().resolves(context.lyrics);

		await server.register({
			plugin: require('../server/korin/api'),
			options: { getLyrics: mockGetLyrics },
		});
	});

	test('korin api request returns expected response', async ({ context }) => {
		const { result } = await server.inject({
			method: 'GET',
			url: '/korin',
		});
		expect(result).to.equal(context.lyrics);
	});
});

describe('methods', () => {
	const client = got.extend({ baseUrl: '/' });
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
		sinon.stub(client, 'get').resolves({ body: context.data });
		sinon.stub(lyricist, 'song').resolves({ lyrics: context.lyrics });
	});

	after(() => {
		sinon.restore();
	});

	test('getLyrics returns expected lyrics', async ({ context }) => {
		const result = await getLyrics({ client, lyricist });

		expect(result).to.equal(context.lyrics);
	});

	test('client is called with search query', async () => {
		const term = 'Jump Kriss kross';
		const query = new URLSearchParams([['q', term]]);

		await getLyrics({ client, lyricist }, term);

		const [first, second] = client.get.args[0];

		expect(first).to.be.equal('/search');
		expect(second).to.be.equal({ query });
	});

	test('lyricist is called with songId and fetchLyrics', async ({
		context,
	}) => {
		await getLyrics({ client, lyricist }, '');

		const [first, second] = lyricist.song.args[0];
		const songId = jsonata(lyricsIdPath).evaluate(JSON.parse(context.data));

		expect(first).to.be.equal(songId);
		expect(second).to.be.equal({ fetchLyrics: true });
	});
});
