import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export const disconnectAndStopDb = async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
};

export const getDbConnection = async () => {
	mongoServer = new MongoMemoryServer();
	const mongoUri = await mongoServer.getConnectionString();
	return mongoose.connect(mongoUri, { useNewUrlParser: true });
};
