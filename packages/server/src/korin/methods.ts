import Crypto from 'crypto';
import utils from '../utils';
import helpers from './helpers';

const {
	getProfileByArtistAndTrack,
	getChartTopTracks,
	getArtistImage,
} = helpers;
const { time, getCache } = utils;
export default [
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
	{
		name: 'korin.getChartTopTracks',
		method: getChartTopTracks,
		options: {
			cache: getCache({ expiresIn: time.oneDay }),
			generateKey: () => `korinGetChartTopTracks-${Date.now()}`,
		},
	},
	{
		name: 'korin.getArtistImage',
		method: getArtistImage,
		options: {
			cache: getCache({ expiresIn: time.oneMonth }),
			generateKey: artist => {
				return Crypto.createHash('sha1')
					.update(artist)
					.digest('hex');
			},
		},
	},
];
