module.exports = {
	name: 'pipeline',
	version: '1.0.0',
	register: (server, { methods }) => {
		server.method(methods);
	},
};
