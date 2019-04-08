module.exports = {
	name: 'serve-static-files',
	version: '0.0.1',
	register: (server, { rootPath, cssPath }) => {
		server.dependency('inert');

		server.route({
			path: '/css/{path*}',
			method: 'GET',
			handler: {
				directory: {
					path: cssPath,
					redirectToSlash: true,
					listing: false,
					index: false,
				},
			},
		});

		server.route({
			path: '/{path*}',
			method: 'GET',
			handler: {
				directory: {
					path: rootPath,
					redirectToSlash: true,
					listing: false,
					index: true,
				},
			},
		});
	},
};
