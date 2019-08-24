const plugin = require('./plugin');
const { vars } = require('../utils');

export default  {
	plugin,
	options: {
		accessToken: vars.ROLLBAR_ACCESS_TOKEN,
		captureUncaught: true,
		captureUnhandledRejections: true,
	},
};
