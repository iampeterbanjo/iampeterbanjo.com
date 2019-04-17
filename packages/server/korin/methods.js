const Crypto = require('crypto');
const { time } = require('../utils');
const { getLyrics, getTopTracks, getPersonalityProfile } = require('./helpers');

const cache = {
	expiresIn: time.oneDay,
	staleIn: time.tenSeconds,
	staleTimeout: time.oneHundredMilliseconds,
	generateTimeout: time.oneMinute,
	cache: 'mongodb-cache',
};

module.exports = {
	methods: [
		{
			name: 'korin.getTopTracks',
			method: getTopTracks,
			options: {
				cache,
				generateKey: () => 'getTopTracks',
			},
		},
		{
			name: 'korin.getLyrics',
			method: getLyrics,
			options: {
				cache,
				generateKey: ({ searchString }) => {
					if (!searchString) return searchString;

					return Crypto.createHash('sha1')
						.update(searchString)
						.digest('hex');
				},
			},
		},
		{
			name: 'korin.getPersonalityProfile',
			method: getPersonalityProfile,
			options: {
				cache,
				generateKey: ({ lyrics }) => {
					if (!lyrics) return 'personality-profile';

					return Crypto.createHash('sha1')
						.update(lyrics)
						.digest('hex');
				},
			},
		},
	],
};
