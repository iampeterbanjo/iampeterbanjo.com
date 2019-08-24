const plugin = require('./plugin');

export default  {
	plugin,
	options: {
		accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
		captureUncaught: true,
		captureUnhandledRejections: true,
	},
};
