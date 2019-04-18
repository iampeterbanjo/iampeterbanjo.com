const Crypto = require('crypto');
const { time } = require('../utils');
const {
	getLyrics,
	getTopTracks,
	getPersonalityProfile,
	getSongData,
} = require('./helpers');

const cache = {
	expiresIn: time.oneDay,
	staleIn: time.tenSeconds,
	staleTimeout: time.oneHundredMilliseconds,
	generateTimeout: time.oneMinute,
	cache: 'mongodb-cache',
};

module.exports = [
	{
		name: 'korin.getSongData',
		method: getSongData,
		options: {
			cache,
			generateKey: search => {
				if (!search) return search;

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
			generateKey: () => 'getTopTracks',
		},
	},
	{
		name: 'korin.getLyrics',
		method: getLyrics,
		options: {
			cache,
			generateKey: ({ search }) => {
				if (!search) return search;

				return Crypto.createHash('sha1')
					.update(search)
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
];
