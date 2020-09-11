import fp from 'fastify-plugin';
import NextJs from 'next';

export default fp(async function nextFp(instance, options = {}, nextFunc) {
	const nextApp = NextJs({
		dir: '../frontend',
	});

	const nextAppHandler = nextApp.getRequestHandler();

	nextApp
		.prepare()
		.then(() => {
			instance.get('/*', async (req, reply) => {
				reply.statusCode = 200;

				return nextAppHandler(req.raw, reply.raw).then(() => {
					reply.sent = true;
				});
			});

			instance.setNotFoundHandler(async (request, reply) => {
				reply.status(404).send('Page Not Found!');
			});
		})
		.catch(err => nextFunc(err));

	nextFunc();
});
