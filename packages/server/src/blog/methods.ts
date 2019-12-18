import Crypto from 'crypto';
import time from 'time';

import utils from '../utils';
import { getBlogFiles, getBlogContents } from './helpers';

const { getCache } = utils;

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
