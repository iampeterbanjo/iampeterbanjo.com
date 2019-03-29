const CatboxMongoDB = require('catbox-mongodb');

module.exports = {
	name: 'Cache',
	version: '0.0.1',
	register: async (server, { Provider, test }) => {
		console.log(server.test);
		const result = await server.cache.provision({
			name: 'cache',
			provider: {
				constructor: Provider,
				options: {
					uri: 'your-mongodb-uri',
					partition: 'cache',
				},
			},
		});

		console.log(result);
	},
};
