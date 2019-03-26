const path = require('path');
const Vision = require('vision');
const ejs = require('ejs');
const Nunjucks = require('nunjucks');
const templatesPath = path.join(__dirname, 'templates');

module.exports = {
	plugin: Vision,
	options: {
		engines: {
			html: {
				compile: (src, options) => {
					const template = Nunjucks.compile(src, options.environment);
					return context => {
						return template.render(context);
					};
				},

				prepare: (options, next) => {
					options.compileOptions.environment = Nunjucks.configure(
						options.path,
						{ watch: false }
					);

					return next();
				},
			},
		},
		path: templatesPath,
	},
};
