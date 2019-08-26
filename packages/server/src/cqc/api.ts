export const name = 'cqc-api';
export const version = '1.0.0';
export const register = (server, { client }) => {
	server.route({
		path: '/cqc/providers',
		method: 'GET',
		handler: async () => (await client.get('/providers')).body,
	});
};
