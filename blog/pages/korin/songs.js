const { api } = require('server');

module.exports = async ({ createPage, songPage }) => {
	const server = await api();
	const { result: data = {} } = await server.inject({
		method: 'GET',
		url: '/korin/songs',
	});

	createPage({
		path: `/korin/songs`,
		component: songPage,
		context: {
			data,
			seo: {
				title: 'Korin: top 40 lastfm songs',
				description: 'Personality profile of top 40 songs',
			},
		},
	});
};
