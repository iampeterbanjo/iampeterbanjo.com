const clientel = require('./clientel');
const slugger = require('./slugger');
const vars = require('./vars');
const message = require('./message');
const time = require('./time');
const getCache = require('./cache');
const jsonParser = require('./jsonParser');

module.exports = {
	time,
	slugger,
	clientel,
	vars,
	message,
	getCache,
	jsonParser,
};
