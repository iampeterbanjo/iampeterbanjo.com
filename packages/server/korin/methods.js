const Crypto = require('crypto');
const { time, getCache } = require('../utils');
const { getProfileByArtistAndTrack } = require('./helpers');

module.exports = [
	{
		name: 'korin.getProfileByArtistAndTrack',
		method: getProfileByArtistAndTrack,
		options: {
			cache: getCache({ expiresIn: time.oneMonth }),
			generateKey: ({ artist, track }) => {
				const search = `${artist} ${track}`;

				return Crypto.createHash('sha1')
					.update(search)
					.digest('hex');
			},
		},
	},
];
