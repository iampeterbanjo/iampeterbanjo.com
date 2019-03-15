const jsonata = require('jsonata');

exports.getLyrics = async ({ client, lyricist }, callback) => {
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
