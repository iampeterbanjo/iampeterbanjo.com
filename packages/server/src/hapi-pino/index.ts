import plugin from 'hapi-pino';
import env from '@iampeterbanjo/env';

export default {
	plugin,
	options: {
		prettyPrint: env.ENVIRONMENT !== 'production',
		// Redact Authorization headers, see https://getpino.io/#/docs/redaction
		redact: ['req.headers.authorization'],
	},
};
