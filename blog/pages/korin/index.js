const { api, routes } = require('server');
const slugs = require('../slugs');

module.exports = async ({ createPage, korinTracksPage }) => {
	const server = await api();
	const tracksRoute = routes['korin.get.tracks']();
	const { result: data = {} } = await server.inject({
		method: tracksRoute.method,
		url: tracksRoute.url,
	});

	createPage({
		path: slugs['korin.tracks'],
		component: korinTracksPage,
		context: {
			data,
			seo: {
				title: 'Korin: top 40 lastfm tracks',
				description: 'Personality profile of top 40 tracks',
			},
		},
	});
};
