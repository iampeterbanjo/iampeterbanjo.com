import mongoose from 'mongoose';
import Bluebird from 'bluebird';
import { promisify } from 'util';
import env from '@iampeterbanjo/env';

const { MONGODB_ADDON_DB, MONGODB_ADDON_URI } = env;

mongoose.connect[promisify.custom] = (error, db) => {
	return new Promise((resolve, reject) => {
		if (error) return reject(error);
		return resolve(db);
	});
};

export const connectionOptions = {
	useNewUrlParser: true,
	dbName: MONGODB_ADDON_DB,
	promiseLibrary: Bluebird,
};

export const disconnectAndStopDb = async () => {
	await mongoose.disconnect();
};

export const getDbConnection = async () => {
	await mongoose.connect(MONGODB_ADDON_URI, connectionOptions);

	return {
		uri: MONGODB_ADDON_URI,
		connection: mongoose.connection,
	};
};
