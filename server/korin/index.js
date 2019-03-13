const got = require('got');
const { LYRICS_API_ACCESS_TOKEN, LYRICS_API_URL } = process.env;
const client = got.extend({
	baseUrl: LYRICS_API_URL,
	headers: {
		authorization: `Bearer ${LYRICS_API_ACCESS_TOKEN}`,
	},
});

module.exports = {
	plugin: require('./api'),
	options: { client },
};
