const time = require('./time');

/**
 * @typedef {object} Cache
 * @property {number} cache.expiresIn since time saved
 * @property {number} cache.staleIn Must be less than expiresIn
 * @property {number} cache.generateTimeout wait before returning a timeout error
 * @property {string} cache name
 *
 */
const cache = {
	expiresIn: time.oneDay,
	staleIn: time.tenSeconds,
	staleTimeout: time.oneHundredMilliseconds,
	generateTimeout: time.oneMinute,
	cache: 'mongodb-cache',
};

/**
 * Get cache
 * @param {Partial<Cache>} [options]
 * @return Cache
 */
const getCache = options => {
	return Object.assign({}, cache, options);
};

module.exports = getCache;
