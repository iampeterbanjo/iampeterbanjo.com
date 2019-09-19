import Agenda from 'agenda';
import Helpers from './helpers';
import jobs from './jobs';
import utils from '../utils';

const { time } = utils;

export default class AgendaApi extends Agenda {
	helpers;

	constructor(server, options) {
		super(options);
		this.helpers = new Helpers(server);
	}

	async init() {
		this.define(jobs.IMPORT_CHART_TOP_TRACKS, this.helpers.importChartTracks);

		await this.start();
		await this.every(time.oneDay, jobs.IMPORT_CHART_TOP_TRACKS);
	}
}
