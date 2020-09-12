import { DbConnector } from '@iampeterbanjo/types';
import mongoose, { ConnectionOptions } from 'mongoose';

export const connectionOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	autoIndex: false,
} as ConnectionOptions;

export const getDbConnection: DbConnector = async ({ uri, name }) => {
	mongoose.connection.on('error', () => {
		console.error(`Unable to connect to database: ${name}`);
	});

	mongoose.connection.once('connected', () => {
		console.log(`Connected to database: ${name}`);
	});

	await mongoose.connect(uri, connectionOptions);

	return {
		uri: uri,
		connection: mongoose.connection,
	};
};
