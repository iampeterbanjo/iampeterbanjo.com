const got = require('got');

module.exports = {
	name: 'korin-api',
	version: '0.0.1',
	register: (server, { client }) => {
		server.route({
			path: '/korin',
			method: 'GET',
			handler: async (request, reply) => {
				try {
					const data = (await client.get(`/songs/3039923`)).body;
					const songLyricsRoot = JSON.parse(data).response.song.path;
					const song = (await client.get(`/annotations/11592495`)).body;
					// const lyricsUrl = `https://genius.com/${songLyricsRoot}`;
					// return lyricsUrl;
					// const lyrics = await got(`https://genius.com/${songLyricsRoot}`);
					// console.log(lyricts);
					console.log(song);
					return song;
				} catch (error) {
					console.warn(error);
				}
			},
		});
	},
};
