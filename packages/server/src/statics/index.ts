const path = require('path');
const plugin = require('./plugin');

const rootPath = path.join(__dirname, '../../blog/public/');
const cssPath = '../css';
const jsPath = '../js';
const imagePath = '../images';

module.exports = {
	plugin,
	options: { rootPath, cssPath, jsPath, imagePath },
};
