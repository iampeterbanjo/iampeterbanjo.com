const time = require('./time');

const cache = {
	expiresIn: time.oneDay,
	staleIn: time.tenSeconds,
	staleTimeout: time.oneHundredMilliseconds,
	generateTimeout: time.oneMinute,
	cache: 'mongodb-cache',
};

const getCache = options => {
	return Object.assign({}, cache, options);
};

module.exports = getCache;
