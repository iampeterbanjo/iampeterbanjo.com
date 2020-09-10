import { Next } from '@iampeterbanjo/types';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import NextJs from 'next';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { blogRoutes, commentsRoutes } from './services';
import { cors, database, fastifyNext, migrations, sensible } from './plugins';

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

	const frontend = NextJs({
		dir: '../frontend',
	}).getRequestHandler();

	// instance.register(fastifyNext, {
	// 	dir: `../frontend`,
	// });
	instance.get('/*', async (req, reply) => {
		reply.statusCode = 200;

		return frontend(req.raw, reply.raw).then(() => {
			reply.sent = true;
		});
	});

	next();
});
