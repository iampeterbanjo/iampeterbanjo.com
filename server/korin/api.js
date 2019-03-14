const got = require('got');
const jsonata = require('jsonata');

module.exports = {
	name: 'korin-api',
	version: '0.0.1',
	register: (server, { client, lyricist }) => {
		server.route({
			path: '/korin',
			method: 'GET',
			handler: async (request, reply) => {
				try {
					const query = new URLSearchParams([['q', 'Humble Kendric Lamar']]);
					const data = (await client.get('/search', { query })).body;
					const expression = jsonata('response.hits[0].result.id');
					const songId = expression.evaluate(JSON.parse(data));
					const { lyrics } = await lyricist.song(songId, { fetchLyrics: true });

					return lyrics || '';
				} catch (error) {
					console.warn(error);
				}
			},
		});
	},
};
