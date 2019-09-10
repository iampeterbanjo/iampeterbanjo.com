import Nunjucks from 'nunjucks';
import Path from 'path';
import routes from './routes';
import * as context from './context';
import createApp from './ssr/app';
import { createRenderer } from 'vue-server-renderer';

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

const getBerserker = server => {
	const { method, path } = routes.get_berserker();
	server.route({
		method,
		path,
		handler: async (request, reply) => {
			const app = createApp({ message: 'Fatality' });
			const html = await createRenderer().renderToString(app);

			return reply.view('berserker/list', { html });
		},
	});
};

const getKorinProfiles = server => {
	const { method, path } = routes.get_korin_profiles();
	server.route({
		method,
		path,
		handler: async (request, reply) => {
			const { artist, track } = request.params;
			const { profile, summary } = await server.methods.view.trackProfile({
				artist,
				track,
			});

			return reply.view('korin/profiles', {
				profile: JSON.stringify(profile),
				summary,
				artist,
				track,
				pathToTracks: routes.get_korin_tracks().url,
			});
		},
	});
};

const getKorinTracks = server => {
	const { method, path } = routes.get_korin_tracks();
	server.route({
		method,
		path,
		handler: async (request, reply) => {
			const tracks = await server.methods.view.topTracks();

			return reply.view('korin/tracks', { tracks });
		},
	});
};

const viewBlogList = server => {
	const { method, path } = routes.get_blog_posts();

	server.route({
		method,
		path,
		handler: async (request, reply) => {
			const posts = await server.methods.view.blogList();

			return reply.view('blog/list', { posts });
		},
	});
};

const viewBlogContent = server => {
	const { method, path } = routes.get_blog_details();

	server.route({
		method,
		path,
		handler: async (request, reply) => {
			const { post } = request.params;
			const details = await server.methods.view.blogContent(post);

			return reply.view('blog/details', { ...details });
		},
	});
};

const viewHomePage = server => {
	const { method, path } = routes.get_home();

	server.route({
		method,
		path,
		handler: (request, reply) => {
			return reply.view('misc/home');
		},
	});
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

		getKorinTracks(server);
		getKorinProfiles(server);
		viewBlogList(server);
		viewBlogContent(server);
		viewHomePage(server);
		getBerserker(server);
	},
};
