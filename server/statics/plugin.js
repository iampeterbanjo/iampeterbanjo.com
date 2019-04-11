module.exports = {
	name: 'serve-static-files',
	version: '0.0.1',
	register: (server, { rootPath, cssPath, jsPath }) => {
		server.dependency('inert');

		server.route({
			path: '/css/{path*}',
			method: 'GET',
			handler: {
				directory: {
					path: cssPath,
					redirectToSlash: false,
					listing: false,
					index: false,
				},
			},
		});

		server.route({
			path: '/js/{path*}',
			method: 'GET',
			handler: {
				directory: {
					path: jsPath,
					redirectToSlash: false,
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
					redirectToSlash: false,
					listing: false,
					index: true,
				},
			},
		});
	},
};
