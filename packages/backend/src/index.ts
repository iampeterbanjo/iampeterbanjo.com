require('make-promises-safe');
import { PORT } from '@iampeterbanjo/env';
import fastify from 'fastify';
import backend from './server';
import { getDbConnection, serverConfig } from './config';

const start = async () => {
	const server = fastify(serverConfig);

	try {
		await server.register(backend, { getDbConnection });
		await server.ready();
		await server.listen(PORT, '0.0.0.0');

		server.log.info(`Backend (fastify) listening on port ${PORT}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};

start().catch(err => console.error(err));
