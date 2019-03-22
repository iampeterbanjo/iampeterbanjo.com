const ejs = require('ejs');
const Vision = require('vision');

module.exports = {
	plugin: require('./plugin'),
	options: { ejs, Vision },
};
