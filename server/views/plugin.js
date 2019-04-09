const Nunjucks = require('nunjucks');
const Path = require('path');
const routes = require('../routes');

const registerViews = {
	engines: {
		html: {
			compile: (src, options) => {
				const template = Nunjucks.compile(src, options.environment);
				return context => {
					return template.render(context);
				};
			},
			prepare: (options, next) => {
				// eslint-disable-next-line no-param-reassign
				options.compileOptions.environment = Nunjucks.configure(options.path, {
					watch: false,
				});
				return next();
			},
		},
	},
	path: Path.join(__dirname, './templates'),
};

const after = async server => {
	server.views(registerViews);

	const { method, path } = routes['get.apps.korin.profiles']();
	server.route({
		method,
		path,
		handler: (request, h) =>
			h.view('index', { title: 'test', message: 'Hello' }),
	});
};

module.exports = {
	name: 'views',
	version: '1.0.0',
	register: async server => {
		server.dependency('vision', after);
	},
};
