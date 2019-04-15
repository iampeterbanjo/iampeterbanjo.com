module.exports = {
	name: 'blog',
	version: '1.0.0',
	register: server => {
		server.route({
			path: '/blog/{path*}',
			method: 'GET',
			handler: () => 'Hello blog',
		});
	},
};
