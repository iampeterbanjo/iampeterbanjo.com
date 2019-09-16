import Agenda from 'agenda';
import Helpers from './helpers';
import jobs from './jobs';
import utils from '../utils';

const { time } = utils;

export class AgendaApi extends Agenda {
	constructor(options) {
		super(options);
	}

	async init() {
		await this.start();

		await this.every(time.oneDay, jobs.IMPORT_CHART_TOP_TRACKS);
	}
}

export default {
	name: 'agenda',
	version: '1.0.0',
	dependencies: {
		models: '1.x.x',
		'korin-api': '1.x.x',
	},
	register: async (server, { getDbConnection }) => {
		const connection = await getDbConnection();
		const helpers = new Helpers(server);
		const agenda = new AgendaApi({
			db: connection.db,
		});

		agenda.define(jobs.IMPORT_CHART_TOP_TRACKS, helpers.importChartTracks);

		server.app.agenda = agenda;
	},
};
