import Hodor from 'hapi-hodor';
import env from '@iampeterbanjo/env';

export default {
	plugin: Hodor,
	options: {
		sessionSecretKey: env.SESSION_SECRET_KEY,
		auth0Audience: env.AUTH0_AUDIENCE,
		auth0Domain: env.AUTH0_DOMAIN,
		auth0PublicKey: env.AUTH0_PUBLIC_KEY,
		auth0SecretKey: env.AUTH0_SECRET_KEY,
	},
};
