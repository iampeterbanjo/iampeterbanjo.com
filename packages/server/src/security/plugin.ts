import bell from '@hapi/bell';
import cookie from 'hapi-auth-cookie';
import doorkeeper from 'hapi-doorkeeper';
import utils from '../utils';

const {
	vars: {
		SESSION_SECRET_KEY,
		AUTH0_DOMAIN,
		AUTH0_PUBLIC_KEY,
		AUTH0_SECRET_KEY,
	},
} = utils;

export default {
	name: 'security',
	version: '1.0.0',
	register: async server => {
		await server.register([
			bell,
			cookie,
			{
				plugin: doorkeeper,
				options: {
					sessionSecretKey: SESSION_SECRET_KEY,
					auth0Domain: AUTH0_DOMAIN,
					auth0PublicKey: AUTH0_PUBLIC_KEY,
					auth0SecretKey: AUTH0_SECRET_KEY,
				},
			},
		]);
	},
};
