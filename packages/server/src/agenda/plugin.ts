import AgendaApi from './AgendApi';
import utils from '../utils';

const { time } = utils;

export default {
	name: 'agenda',
	version: '1.0.0',
	dependencies: {
		models: '1.x.x',
		'korin-api': '1.x.x',
	},
	register: async (server, { getDbConnection }) => {
		const { uri } = await getDbConnection();

		const agenda = new AgendaApi(server, {
			db: { address: uri },
			processEvery: time.fifteenMinutes,
		});

		server.app.agenda = agenda;
	},
};
