// based on https://github.com/bendrucker/hapi-require-https

export const register = function(server, options) {
	server.ext('onRequest', (request, h) => {
		const redirect =
			options.proxy !== false
				? request.headers['x-forwarded-proto'] === 'http'
				: request.server.info.protocol === 'http';
		const host = request.headers['x-forwarded-host'] || request.headers.host;

		if (!redirect) return h.continue;
		const { path = '/', search } = request.url;

		return h
			.redirect(`https://${host}${path}${search}`)
			.takeover()
			.code(301);
	});
};

export const name = 'https-here';
