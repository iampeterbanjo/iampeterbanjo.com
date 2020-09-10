import dotenv from 'dotenv';
import { getMissingFields } from '../lib';

dotenv.config();

const {
	NODE_ENV = 'development',
	PORT = '3000',
	MONGODB_ADDON_URI = '',
	MONGODB_ADDON_DB = '',
} = process.env;

const requiredConfig = ['MONGODB_ADDON_URI', 'MONGODB_ADDON_DB'];

const missingVariables = getMissingFields(process.env, requiredConfig);
if (missingVariables.length > 0) {
	throw new Error(
		`Missing environment variable(s) ${missingVariables.join(', ')}`,
	);
}

const VERSION = process.env.npm_package_version || '';

export { NODE_ENV, PORT, MONGODB_ADDON_URI, MONGODB_ADDON_DB, VERSION };
