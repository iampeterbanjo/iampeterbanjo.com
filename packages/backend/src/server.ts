import { Next } from '@iampeterbanjo/types';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import NextJs from 'next';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { blogRoutes, commentsRoutes } from './services';
import { cors, database, migrations, sensible, nextSsr } from './plugins';

export default fp(function createServer(
	instance: FastifyInstance<Server, IncomingMessage, ServerResponse>,
	opts: any,
	next: Next,
) {
	const { getDbConnection } = opts;

	// fastify.register(database, { getDbConnection });
	// fastify.register(migrations);
	instance.register(sensible);
	instance.register(cors);
	instance.register(blogRoutes, { prefix: 'api' });
	instance.register(commentsRoutes, { prefix: 'api' });
	instance.register(nextSsr);

	next();
});
