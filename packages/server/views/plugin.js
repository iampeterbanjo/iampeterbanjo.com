const Nunjucks = require('nunjucks');
const Path = require('path');
const korinHelpers = require('../korin/helpers');
const routes = require('./routes');

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
			const {
				profile,
				summary,
			} = await korinHelpers.getProfileByArtistAndTrack({
				artist,
				track,
			});

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
			const tracks = korinHelpers.getTopTracks();

			return h.view('korin/tracks', { tracks });
		},
	});
};

const viewBlogList = server => {
	const { method, path } = routes.get_blog_posts();

	server.route({
		method,
		path,
		handler: async (request, h) => {
			const posts = await server.methods.view.blogList();

			return h.view('blog/list', { posts });
		},
	});
};

const viewBlogContent = server => {
	const { method, path } = routes.get_blog_details();

	server.route({
		method,
		path,
		handler: async (request, h) => {
			const { post } = request.params;
			const details = await server.methods.view.blogContent(post);

			return h.view('blog/details', { ...details });
		},
	});
};

module.exports = {
	name: 'views',
	version: '1.0.0',
	dependencies: {
		vision: '5.x.x',
	},
	register: (server, { methods }) => {
		server.views(registerViews);
		server.method(methods);

		getKorinTracks(server);
		getKorinProfiles(server);
		viewBlogList(server);
		viewBlogContent(server);
	},
};
