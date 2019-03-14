module.exports = {
	name: 'serve-static-files',
	version: '0.0.1',
	register: (server, { rootPath }) => {
		server.route({
			path: '/{path*}',
			method: 'GET',
			handler: {
				directory: {
					path: rootPath,
					listing: false,
					index: true,
				},
			},
		})
	},
}
