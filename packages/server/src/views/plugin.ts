import Nunjucks from 'nunjucks';
import Path from 'path';
import * as context from './context';
import * as controller from './controller';

const registerViews = {
	engines: {
		html: {
			compile: (src, options) => {
				const template = Nunjucks.compile(src, options.environment);
				return data => {
					return template.render(data);
				};
			},
			prepare: (options, next) => {
				options.compileOptions.environment = Nunjucks.configure(options.path, {
					watch: false,
				});
				return next();
			},
		},
	},
	context,
	path: Path.join(__dirname, './templates'),
};

export default {
	name: 'views',
	version: '1.0.0',
	dependencies: {
		vision: '5.x.x',
	},
	register: (server, { methods }) => {
		server.views(registerViews);
		server.method(methods);

		controller.handleHomePageGet(server);
		controller.handleBlogContentGet(server);
		controller.handleBlogListGet(server);
		controller.handleKorinTracksGet(server);
		controller.handleKorinProfilesGet(server);
		controller.handleBerserkerGet(server);
	},
};
