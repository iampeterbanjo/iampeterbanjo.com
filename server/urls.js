const urls = {
	'korin.get.songs': () => ({
		method: 'GET',
		path: '/api/korin/songs',
		url: '/api/korin/songs',
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

module.exports = urls;
