module.exports = {
	home: '/',
	'blog.posts': '/blog',
	'korin.tracks': '/korin/tracks',
	'korin.profiles': ({ artist, track }) => `/korin/profiles/${artist}/${track}`,
};
