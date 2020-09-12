import mockingoose from 'mockingoose';
import { MigrationModel } from '../models';

export const disconnectAndStopDb = jest.fn();

export const getDbConnection = async () => {
	const uri = 'mongodb://foobar/baz';

	return {
		uri,
		connection: {
			db: jest.fn(),
			MigrationModel: mockingoose(MigrationModel),
		},
	};
};
