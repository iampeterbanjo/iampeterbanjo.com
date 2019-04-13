module.exports = {
	name: 'cqc-api',
	version: '0.2.0',
	register: (server, { client }) => {
		server.route({
			path: '/cqc/providers',
			method: 'GET',
			handler: async () => (await client.get('/providers')).body,
		});
	},
};
