import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export const disconnectAndStopDb = async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
};

export const getDbConnection = async () => {
	mongoServer = new MongoMemoryServer();
	const uri = await mongoServer.getConnectionString();
	await mongoose.connect(uri, { useNewUrlParser: true });

	return {
		uri,
		connection: mongoose.connection,
	};
};
