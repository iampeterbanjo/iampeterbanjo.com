import DatabaseCleaner from 'database-cleaner';
import { promisify } from 'util';

const databaseCleaner = new DatabaseCleaner('mongodb');
const asyncDbClean = promisify(databaseCleaner.clean);

export const closeDatabase = server => {
	server.app.db.connection.close();
};

export const cleanDatabase = async server => {
	await asyncDbClean(server.app.db.link);
};
