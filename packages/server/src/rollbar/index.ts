import plugin from './plugin';
import env from '@iampeterbanjo/env';

export default {
	plugin,
	options: {
		accessToken: env.ROLLBAR_ACCESS_TOKEN,
		captureUncaught: true,
		captureUnhandledRejections: true,
	},
};
