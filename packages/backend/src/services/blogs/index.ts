import { Blog } from '@iampeterbanjo/types';
import * as Fastify from 'fastify';

export async function blogRoutes(instance: Fastify.FastifyInstance) {
	instance.get('/blogs', async (req, reply) => {
		const result: Blog[] = [];
		result.push({
			title: 'title1',
			content: 'blogpost1',
			author: 'abc',
		});
		result.push({
			title: 'title2',
			content: 'blogpost2',
			author: 'xyz',
		});
		return result;
	});
}
