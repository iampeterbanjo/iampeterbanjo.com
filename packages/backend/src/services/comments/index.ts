import { Comment } from '@iampeterbanjo/types';
import * as Fastify from 'fastify';

export async function commentsRoutes(instance: Fastify.FastifyInstance) {
	instance.get('/comments', async (req, reply) => {
		const result: Comment[] = [];
		result.push({
			content: 'comment1',
			author: 'qqq',
		});
		result.push({
			content: 'comment2',
			author: 'www',
		});
		return result;
	});
}
