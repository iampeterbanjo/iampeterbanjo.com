const {
	WATSON_PI_API_KEY,
	WATSON_PI_API_URL,
	WATSON_PI_API_VERSION,
} = process.env;

module.exports = {
	baseUrl: 'http://0.0.0.0:8080',
	lyricsIdPath: 'response.hits[0].result.id',
	WATSON_PI_API_KEY,
	WATSON_PI_API_URL,
	WATSON_PI_API_VERSION,
};
