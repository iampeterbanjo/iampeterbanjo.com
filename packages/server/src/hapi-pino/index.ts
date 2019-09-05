import plugin from 'hapi-pino';
import utils from '../utils';

const {
	vars: { ENVIRONMENT },
} = utils;

export default {
	plugin,
	options: {
		prettyPrint: ENVIRONMENT !== 'production',
		// Redact Authorization headers, see https://getpino.io/#/docs/redaction
		redact: ['req.headers.authorization'],
	},
};
