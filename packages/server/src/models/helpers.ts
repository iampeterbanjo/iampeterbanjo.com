import mongoose from 'mongoose';
import Bluebird from 'bluebird';
import utils from '../utils';
import { promisify } from 'util';

const { vars } = utils;
const { MONGODB_ADDON_DB, MONGODB_ADDON_URI } = vars;

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
	return mongoose.connect(MONGODB_ADDON_URI, connectionOptions);
};
