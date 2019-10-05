import Hodor from 'hapi-hodor';
import utils from '../utils';

const { vars } = utils;

export default {
	plugin: Hodor,
	options: {
		sessionSecretKey: vars.SESSION_SECRET_KEY,
		auth0Audience: vars.AUTH0_AUDIENCE,
		auth0Domain: vars.AUTH0_DOMAIN,
		auth0PublicKey: vars.AUTH0_PUBLIC_KEY,
		auth0SecretKey: vars.AUTH0_SECRET_KEY,
	},
};
