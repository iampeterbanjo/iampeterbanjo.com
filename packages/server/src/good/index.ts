const plugin = require('@hapi/good');

export default  {
	plugin,
	options: {
		reporters: {
			myConsoleReporter: [
				{
					module: '@hapi/good-squeeze',
					name: 'Squeeze',
					args: [{ log: '*', response: '*', error: '*' }],
				},
				{
					module: '@hapi/good-console',
				},
				'stdout',
			],
		},
	},
};
