import mongoose from 'mongoose';

import { DbConnector } from './types';
import { MONGODB_ADDON_URI, MONGODB_ADDON_DB } from './env';

export const connectionOptions = {
	useNewUrlParser: true,
	dbName: MONGODB_ADDON_DB,
};

export const getDbConnection: DbConnector = async () => {
	await mongoose.connect(MONGODB_ADDON_URI, connectionOptions);

	const { connection } = mongoose;

	connection.on('error', () => {
		console.log(`Unable to connect to database: ${MONGODB_ADDON_DB}`);
	});

	connection.once('open', () => {
		console.log(`Connected to database: ${MONGODB_ADDON_DB}`);
	});

	return {
		uri: MONGODB_ADDON_URI,
		connection: connection,
	};
};
