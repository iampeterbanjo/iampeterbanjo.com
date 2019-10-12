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
			const tracks = await server.app.db.TopTrack.find({});

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
			const { profileUrl } = request.params;
			const {
				summary,
				artist,
				title,
				profile,
			} = await server.app.db.TopTrack.findOne({
				profileUrl,
			});

			return reply.view('korin/profiles', {
				profile: JSON.stringify(profile),
				summary,
				artist,
				title,
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
