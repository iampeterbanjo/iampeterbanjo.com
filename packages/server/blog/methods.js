const { time } = require('../utils');

const methods = [
	{
		name: 'blog.getBlogFiles',
		method: () => {
			//
		},
		options: {
			cache: {
				expiresIn: time.oneDay,
				staleIn: time.tenSeconds,
				staleTimeout: time.oneHundredMilliseconds,
				generateTimeout: time.oneMinute,
				cache: 'mongodb-cache',
			},
		},
	},
];

module.exports = methods;
