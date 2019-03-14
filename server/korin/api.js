const jsonata = require('jsonata');

const getLyrics = async ({ client, lyricist }, callback) => {
	try {
		const query = new URLSearchParams([['q', 'Humble Kendric Lamar']]);
		const data = (await client.get('/search', { query })).body;
		const expression = jsonata('response.hits[0].result.id');
		const songId = expression.evaluate(JSON.parse(data));
		const { lyrics } = await lyricist.song(songId, { fetchLyrics: true });

		callback(null, lyrics);
	} catch (error) {
		callback(error);
	}
};

module.exports = {
	name: 'korin-api',
	version: '0.0.1',
	register: (server, { client, lyricist }) => {
		server.method('getLyrics', getLyrics);

		server.route({
			path: '/korin',
			method: 'GET',
			handler: async (request, reply) => {
				try {
					server.method.getLyrics({ client, lyricist }, (error, lyrics) => {
						if (error) throw error;

						reply(lyrics);
					});
				} catch (error) {
					console.warn(error);
				}
			},
		});
	},
};
