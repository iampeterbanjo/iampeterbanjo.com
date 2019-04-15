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

const getKorinProfiles = server => {
	const { method, path } = routes.get_korin_profiles();
	server.route({
		method,
		path,
		handler: async (request, h) => {
			const { artist, track } = request.params;
			const { client } = routes.get_apis_korin_profiles({
				artist,
				track,
			});
			const { body } = await client();
			const { profile, summary } = body;

			return h.view('korin/profiles', {
				profile: JSON.stringify(profile),
				summary,
				artist,
				track,
			});
		},
	});
};

const getKorinTracks = server => {
	const { method, path } = routes.get_korin_tracks();
	server.route({
		method,
		path,
		handler: async (request, h) => {
			const { client } = routes.get_apis_korin_tracks();
			const { body } = await client();

			return h.view('korin/tracks', { tracks: body });
		},
	});
};

const after = async server => {
	server.views(registerViews);

	getKorinTracks(server);
	getKorinProfiles(server);
};

module.exports = {
	name: 'views',
	version: '1.0.0',
	register: async server => {
		server.dependency('vision', after);
	},
};
