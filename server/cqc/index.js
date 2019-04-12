const got = require('got');
const plugin = require('./api');

const client = got.extend({ baseUrl: process.env.CQC_API_URL });

module.exports = {
	plugin,
	options: { client },
};
