import { CmsPosts } from '@iampeterbanjo/types';
import * as Fastify from 'fastify';
import blogPosts from '@iampeterbanjo/cms';

export async function blogRoutes(instance: Fastify.FastifyInstance) {
	instance.get('/blogs', async (req, reply) => {
		return blogPosts as CmsPosts[];
	});
}
