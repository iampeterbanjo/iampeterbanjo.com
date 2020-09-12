import * as mongoose from 'mongoose';

type CreatedConnection = mongoose.Connection;

export interface Connection {
	uri: string;
	connection: CreatedConnection;
}

export type DbConnector = (params: {
	uri: string;
	name: string;
}) => Promise<Connection>;

export interface IDatabase {
	connection: CreatedConnection;
}
