import Crypto from 'crypto';
import helpers from './helpers';
import utils from '../utils';

const { getBlogFiles, getBlogContents } = helpers;
const { time, getCache } = utils;

export default [
	{
		name: 'blog.getBlogFiles',
		method: getBlogFiles,
		options: {
			cache: getCache({ expiresIn: time.oneWeek }),
			generateKey: () => `getBlogFiles-${Date.now()}`,
		},
	},
	{
		name: 'blog.getBlogContents',
		method: getBlogContents,
		options: {
			cache: getCache({ expiresIn: time.oneWeek }),
			generateKey: filename => {
				return Crypto.createHash('sha1')
					.update(filename)
					.digest('hex');
			},
		},
	},
];
