const CatboxMongoDB = require('catbox-mongodb');

module.exports = {
	name: 'Cache',
	version: '0.0.1',
	register: async (server, { Catbox }) => {
		const client = new Catbox.Client(CatboxMongoDB);
	},
};
