const path = require('path');
const rootPath = path.join(__dirname, '../../blog/public/');

module.exports = {
	plugin: require('./plugin'),
	options: { rootPath },
};
