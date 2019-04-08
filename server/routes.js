const routes = {
	'api.korin.get.tracks': () => ({
		method: 'GET',
		path: '/api/korin/tracks',
		url: '/api/korin/tracks',
	}),

	'api.korin.get.profiles': (options = {}) => {
		const { artist, track } = options;
		return {
			method: 'GET',
			path: '/api/korin/profiles/{artist}/{track}',
			url: `/api/korin/profiles/${artist}/${track}`,
		};
	},

	'app.korin.get.profiles': (options = {}) => {
		const { artist, track } = options;
		return {
			method: 'GET',
			path: '/app/korin/profiles/{artist}/{track}',
			url: `/app/korin/profiles/${artist}/${track}`,
		};
	},
};

module.exports = routes;
