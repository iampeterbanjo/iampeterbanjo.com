const path = require('path');
const Vision = require('vision');
const ejs = require('ejs');
const templatesPath = path.join(__dirname, 'templates');

module.exports = {
	plugin: Vision,
	options: {
		engines: { ejs },
		path: templatesPath,
	},
};
