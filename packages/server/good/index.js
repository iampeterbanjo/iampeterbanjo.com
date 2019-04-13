const plugin = require('good');

module.exports = {
	plugin,
	options: {
		reporters: {
			myConsoleReporter: [
				{
					module: 'good-squeeze',
					name: 'Squeeze',
					args: [{ log: '*', response: '*' }],
				},
				{
					module: 'good-console',
				},
				'stdout',
			],
		},
	},
};
