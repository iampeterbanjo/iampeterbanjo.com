const R = require('ramda');
const { api, routes } = require('server');
const slugs = require('../slugs');

const kebabCase = input => R.replace(/\s/g, '-', input);

module.exports = async ({ createPage, korinTracksPage }) => {
	const server = await api();
	const tracksRoute = routes['korin.get.tracks']();
	const { result: data = {} } = await server.inject({
		method: tracksRoute.method,
		url: tracksRoute.url,
	});
	const tracks = R.pathOr([], ['tracks', 'track'], data);

	createPage({
		path: slugs['korin.tracks'],
		component: korinTracksPage,
		context: {
			tracks,
			seo: {
				title: 'Korin: top 40 lastfm tracks',
				description: 'Personality profile of top 40 tracks',
			},
		},
	});

	tracks
		.map(song => {
			const { name } = song;
			const artist = R.path(['artist', 'name'], song);

			return { artist, track: name };
		})
		.map(async ({ artist, track }) => {
			// console.log(encodeURI(artist), encodeURI(track));
			const artistEncoded = encodeURI(artist);
			const trackEncoded = encodeURI(track);

			// const artistPath = kebabCase(artist);
			// const trackPath = kebabCase(name);
			// const pagePath = slugs['korin.profiles']({ artist, track });

			const profileRoutes = routes['korin.get.profiles']({
				artist: artistEncoded,
				track: trackEncoded,
			});
			const { result: profileData = {} } = await server.inject({
				method: profileRoutes.method,
				url: profileRoutes.url,
			});
		});
};
