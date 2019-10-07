import Hapi from '@hapi/hapi';
import * as controller from './controller';
import * as routes from './routes';
import { mockSchedulePlugin } from '../../factory';

const Server = async () => {
	const server = new Hapi.Server();

	await server.register(mockSchedulePlugin);

	return server;
};

describe('Given handleListJobs', () => {
	test('When GET /jobs `server.app.scheduler.agenda.jobs` is called', async () => {
		const server = await Server();
		jest.spyOn(server.app.scheduler.agenda, 'jobs');
		controller.handleListJobsGet(server);

		await server.inject({
			url: routes.get_jobs().url,
		});

		expect(server.app.scheduler.agenda.jobs).toHaveBeenCalledWith({});
	});
});
