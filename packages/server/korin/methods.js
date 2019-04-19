const Crypto = require('crypto');
const { time } = require('../utils');
const { getTopTracks, getProfileByArtistAndTrack } = require('./helpers');

const cache = {
	expiresIn: time.oneDay,
	staleIn: time.tenSeconds,
	staleTimeout: time.oneHundredMilliseconds,
	generateTimeout: time.oneMinute,
	cache: 'mongodb-cache',
};

module.exports = [
	{
		name: 'korin.getProfileByArtistAndTrack',
		method: getProfileByArtistAndTrack,
		options: {
			cache,
			generateKey: ({ artist, track }) => {
				const search = `${artist} ${track}`;

				return Crypto.createHash('sha1')
					.update(search)
					.digest('hex');
			},
		},
	},
	{
		name: 'korin.getTopTracks',
		method: getTopTracks,
		options: {
			cache,
			generateKey: () => `getTopTracks-${Date.now()}`,
		},
	},
];
