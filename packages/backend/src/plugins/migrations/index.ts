import fp from 'fastify-plugin';
import path from 'path';
import Umzug, { UmzugOptions } from 'umzug';
import { MongoDBStorage } from './MongoDBStorage';

export default fp(async function globePay(fastify, options = {}, next) {
	const defaultOptions = {
		storage: new MongoDBStorage({
			model: fastify.models.Migration,
		}),
		migrations: {
			path: path.join(__dirname, './scripts'),
		},
	};
	const params: UmzugOptions = { ...defaultOptions, ...options };
	const umzug = new Umzug(params);

	fastify.decorate('migrations', umzug);

	next();
});
