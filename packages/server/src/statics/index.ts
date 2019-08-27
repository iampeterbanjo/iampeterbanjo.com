import path from 'path';
import * as plugin from './plugin';

const rootPath = path.join(__dirname, '../../blog/public/');
const cssPath = '../css';
const jsPath = '../js';
const imagePath = '../images';

module.exports = {
	...plugin,
	options: { rootPath, cssPath, jsPath, imagePath },
};
