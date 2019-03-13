const got = require('got');
const jsonata = require('jsonata');

module.exports = {
	name: 'korin-api',
	version: '0.0.1',
	register: (server, { client }) => {
		server.route({
			path: '/korin',
			method: 'GET',
			handler: async (request, reply) => {
				try {
					const query = new URLSearchParams([['q', 'Humble Kendric Lamar']]);
					const data = (await client.get('/search', { query })).body;
					const expression = jsonata('response.hits[0].result.id');
					const songId = expression.evaluate(JSON.parse(data));
					// get lyrics with lyricist

					console.log(songId);

					// const song = await alltomp3.findLyrics('Humble', 'Kendric Lamar');
					// const data = (await client.get(`/songs/3039923`)).body;
					// const songLyricsRoot = JSON.parse(data).response.song.path;
					// const song = (await client.get(`/annotations/11592495`)).body;
					// const lyricsUrl = `https://genius.com/${songLyricsRoot}`;
					// return lyricsUrl;
					// const lyrics = await got(`https://genius.com/${songLyricsRoot}`);
					// console.log(lyricts);
					// console.log(songId);
					return songId || '';
				} catch (error) {
					console.warn(error);
				}
			},
		});
	},
};
