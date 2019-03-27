const got = require('got');
const { PORT } = process.env;
const client = got.extend({
	baseUrl: `http://0.0.0.0:${PORT}`,
	json: true,
});

module.exports = ({ createPage, songPage }) => {
	// const { body: songs } = await client.get(`/korin/songs`);

	createPage({
		path: `/korin/songs`,
		component: songPage,
		context: {
			test: 'yippey kay yeah',
			seo: {
				title: 'Korin: top 40 lastfm songs',
				description: 'Personality profile of top 40 songs',
			},
		},
	});
};
