import Helpers from './helpers';
import jobs from './jobs';
import utils from '../utils';

const { time } = utils;

export default class Scheduler {
	public helpers;
	public agenda;
	public routines = new Map();

	constructor({ server, Agenda, options }) {
		this.agenda = new Agenda(options);
		this.helpers = new Helpers(server);
		this.routines.set('IMPORT_CHART_TOP_TRACKS', {
			description: 'Import LastFm chart top tracks',
		});
	}

	async init() {
		this.agenda.define(
			this.routines.get('IMPORT_CHART_TOP_TRACKS'),
			this.helpers.importChartTracks,
		);

		await this.agenda.start();
		await this.agenda.every(time.oneDay, jobs.IMPORT_CHART_TOP_TRACKS);
	}
}
