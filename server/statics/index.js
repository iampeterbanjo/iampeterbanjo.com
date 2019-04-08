const path = require('path');
const plugin = require('./plugin');

const rootPath = path.join(__dirname, '../../blog/public/');

module.exports = {
	plugin,
	options: { rootPath },
};
