const urls = {
	'korin.get.songs': () => ({
		method: 'GET',
		url: '/api/korin/songs',
	}),
	'korin.get.profile': (artist, track) => ({
		method: 'GET',
		url: `/api/korin/profile/${artist}/${track}`,
	}),
};

module.exports = urls;
