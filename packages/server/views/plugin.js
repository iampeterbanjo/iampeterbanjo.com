const Nunjucks = require('nunjucks');
const Path = require('path');
const blogRoutes = require('../blog/routes');
const korinRoutes = require('../korin/routes');

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
	const { method, path } = korinRoutes.get_korin_profiles();
	server.route({
		method,
		path,
		handler: async (request, h) => {
			const { artist, track } = request.params;
			const { client } = korinRoutes.get_apis_korin_profiles({
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
	const { method, path, client } = korinRoutes.get_korin_tracks();
	server.route({
		method,
		path,
		handler: async (request, h) => {
			const { body } = await client();

			return h.view('korin/tracks', { tracks: body });
		},
	});
};

const getBlogList = server => {
	const { method, path } = blogRoutes.get_blog_posts();
	server.route({
		method,
		path,
		handler: async () => {
			//
		},
	});
};

const after = async server => {
	server.views(registerViews);

	getKorinTracks(server);
	getKorinProfiles(server);
	getBlogList(server);
};

module.exports = {
	name: 'views',
	version: '1.0.0',
	register: async server => {
		server.dependency('vision', after);
	},
};
