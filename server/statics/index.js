const path = require('path');
const plugin = require('./plugin');

const rootPath = path.join(__dirname, '../../blog/public/');
const cssPath = '../css';

module.exports = {
	plugin,
	options: { rootPath, cssPath },
};
