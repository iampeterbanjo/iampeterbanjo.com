const jsonata = require('jsonata');
const lyricsIdPath = 'response.hits[0].result.id';

exports.lyricsIdPath = lyricsIdPath;

exports.getArtists = async ({ lastfmApi }) => {
	const query = new URLSearchParams([
		['method', 'chart.getTopArtists'],
		['format', 'json'],
		['api_key', lastfmApi.defaults.options.apiKey],
	]);

	return (await lastfmApi.get('/', { query })).body;
};

exports.getLyrics = async ({ geniusApi, lyricist }, term) => {
	const query = new URLSearchParams([['q', term]]);
	const data = (await geniusApi.get('/search', { query })).body;
	const expression = jsonata(lyricsIdPath);
	const songId = expression.evaluate(JSON.parse(data));
	const { lyrics } = await lyricist.song(songId, { fetchLyrics: true });

	return lyrics;
};
