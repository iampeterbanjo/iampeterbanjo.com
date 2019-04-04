const routes = {
	'korin.get.tracks': () => ({
		method: 'GET',
		path: '/api/korin/tracks',
		url: '/api/korin/tracks',
	}),
	'korin.get.profile': (options = {}) => {
		const { artist, track } = options;
		return {
			method: 'GET',
			path: `/api/korin/profile/{artist}/{track}`,
			url: `/api/korin/profile/${artist}/${track}`,
		};
	},
};

module.exports = routes;
