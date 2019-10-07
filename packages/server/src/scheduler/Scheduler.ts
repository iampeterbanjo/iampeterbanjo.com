import Helpers from './helpers';
import jobs from './jobs';
import utils from '../utils';

const { time } = utils;

export default class Schedule {
	public helpers;
	public agenda;

	constructor({ server, Agenda, options }) {
		this.agenda = new Agenda(options);
		this.helpers = new Helpers(server);
	}

	async init() {
		this.agenda.define(
			jobs.IMPORT_CHART_TOP_TRACKS,
			this.helpers.importChartTracks,
		);

		await this.agenda.start();
		await this.agenda.every(time.oneDay, jobs.IMPORT_CHART_TOP_TRACKS);
	}
}
