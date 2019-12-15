import * as mongoose from 'mongoose';

export interface Connection {
	uri: string;
	connection: mongoose.Connection;
}

export type DbConnector = () => Promise<Connection>;
