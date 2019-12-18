import plugin from './plugin';
import env from 'env';

export default {
	plugin,
	options: {
		accessToken: env.ROLLBAR_ACCESS_TOKEN,
		captureUncaught: true,
		captureUnhandledRejections: true,
	},
};
