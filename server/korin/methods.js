const jsonata = require('jsonata');
const lyricsIdPath = 'response.hits[0].result.id';

exports.lyricsIdPath = lyricsIdPath;

exports.getArtists = async ({ lastfmApi }, term) => {
	return lastfmApi.get('/whatever').body;
};

exports.getLyrics = async ({ geniusApi, lyricist }, term) => {
	const query = new URLSearchParams([['q', term]]);
	const data = (await geniusApi.get('/search', { query })).body;
	const expression = jsonata(lyricsIdPath);
	const songId = expression.evaluate(JSON.parse(data));
	const { lyrics } = await lyricist.song(songId, { fetchLyrics: true });

	return lyrics;
};
