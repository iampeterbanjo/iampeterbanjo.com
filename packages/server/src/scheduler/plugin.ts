import time from '@iampeterbanjo/time';
import Scheduler from './Scheduler';
import * as controller from './controller';

export default {
	name: 'schedule',
	version: '1.0.0',
	dependencies: {
		models: '1.x.x',
		'korin-api': '1.x.x',
		'hapi-hodor': '2.x.x',
	},
	register: async (server, { getDbConnection, Agenda }) => {
		const { uri } = await getDbConnection();

		server.app.scheduler = new Scheduler({
			server,
			Agenda,
			options: {
				db: { address: uri },
				processEvery: time.fifteenMinutes,
			},
		});

		controller.handleListJobsGet(server);
		controller.handleListJobsFailedGet(server);
		controller.handleStartJobPost(server);
	},
};
