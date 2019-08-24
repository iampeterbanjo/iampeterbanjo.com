const topTrack = require('./topTrack');
const profile = require('./profile');
const mock = require('./mock');

/**
 * Get array of objects
 * @param {number} count length
 * @param {object} item
 * @return {Array<object>}
 */
const generate = (count, item) => {
	const result = [];
	let limit = count;

	while (limit) {
		limit -= 1;
		result.push(Object.assign({}, item));
	}

	return result;
};

const factory = {
	topTrack: count => generate(count, topTrack),
	profile: count => generate(count, profile),
	mock,
};

export default  factory;
