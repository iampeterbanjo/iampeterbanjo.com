import mongoose from 'mongoose';
import Bluebird from 'bluebird';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { DbConnector } from '../@types';

let mongoServer: MongoMemoryServer;

export const disconnectAndStopDb = async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
};

export const getDbConnection: DbConnector = async () => {
	mongoServer = new MongoMemoryServer();
	const uri = await mongoServer.getConnectionString();

	// mongoose.set('debug', true);
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		promiseLibrary: Bluebird,
	});

	return {
		uri,
		connection: mongoose.connection,
	};
};
