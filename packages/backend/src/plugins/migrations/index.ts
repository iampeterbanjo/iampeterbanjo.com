import fp from 'fastify-plugin';
import path from 'path';
import Umzug, { UmzugOptions } from 'umzug';
import { MongoDBStorage } from './MongoDBStorage';

export default fp(async function migrationsFp(instance, options = {}, next) {
	const defaultOptions = {
		storage: new MongoDBStorage({
			model: instance.models.Migration,
		}),
		migrations: {
			path: path.join(__dirname, './scripts'),
		},
	};
	const params: UmzugOptions = { ...defaultOptions, ...options };
	const umzug = new Umzug(params);

	instance.decorate('migrations', umzug);

	next();
});
