const Wreck = require('@hapi/wreck');
const plugin = require('./api');

const client = Wreck.defaults({ baseUrl: process.env.CQC_API_URL });

module.exports = {
	plugin,
	options: { client },
};
