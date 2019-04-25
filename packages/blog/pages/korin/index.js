const R = require('ramda');
const { api, routes } = require('server');
const slugify = require('slugify');
const slugs = require('../slugs');

module.exports = async ({ createPage, korinTracksPage, korinProfilesPage }) => {
	const server = await api();
	const tracksRoute = routes.v1.get_korin_tracks();
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
			const artistEncoded = encodeURI(artist);
			const trackEncoded = encodeURI(track);

			const profileRoutes = routes.v1.get_korin_profiles({
				artist: artistEncoded,
				track: trackEncoded,
			});
			const { result: profile = {} } = await server.inject({
				method: profileRoutes.method,
				url: profileRoutes.url,
			});
			const slugOptions = {
				artist: slugify(artist),
				track: slugify(track),
			};
			const profilePath = slugs['korin.profiles'](slugOptions);

			createPage({
				path: profilePath,
				component: korinProfilesPage,
				context: {
					profile,
					seo: {
						title: `Korin: profile ${track} by ${artist} `,
						description: `Personality profile of tracks by IBM Watson personality profile API`,
					},
				},
			});
		});
};
