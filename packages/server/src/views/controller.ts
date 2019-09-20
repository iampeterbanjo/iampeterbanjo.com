import { createRenderer } from 'vue-server-renderer';
import createApp from './ssr/app';
import routes from './routes';

export const handleHomePageGet = server => {
	const { method, path } = routes.get_home();

	server.route({
		method,
		path,
		handler: (request, reply) => {
			return reply.view('misc/home');
		},
	});
};

export const handleBlogContentGet = server => {
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

export const handleBlogListGet = server => {
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

export const handleKorinTracksGet = server => {
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

export const handleKorinProfilesGet = server => {
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

export const handleBerserkerGet = server => {
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
