const got = require('got')
const { LYRICS_SEARCH_KEY, LYRICS_API_URL } = process.env
const client = got.extend({ LYRICS_API_URL, LYRICS_SEARCH_KEY })

module.exports = {
	plugin: require('./api'),
	options: { client },
}
