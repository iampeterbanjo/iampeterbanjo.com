import Helpers from './helpers';
import jobs from './jobs';
import utils from '../utils';

import time from '@iampeterbanjo/time';

export default class Scheduler {
	public helpers;
	public agenda;
	public routines = new Map();

	constructor({ server, Agenda, options }) {
		this.agenda = new Agenda(options);
		this.helpers = new Helpers(server);

		this.addRoutines();
	}

	async init() {
		await this.agenda.start();
		await this.setupImportChartTopTracks();
	}

	addRoutines = () => {
		this.routines.set('IMPORT_CHART_TOP_TRACKS', {
			id: 'IMPORT_CHART_TOP_TRACKS',
			description: 'Import LastFm chart top tracks',
		});
	};

	setupImportChartTopTracks = async () => {
		const { id, description } = this.routines.get('IMPORT_CHART_TOP_TRACKS');

		this.agenda.define(id, () => this.helpers.importChartTracks());

		this.agenda.on(`success:${id}`, () =>
			console.info(`SUCCESS: ${description}`),
		);
		this.agenda.on(`fail:${id}`, () => console.error(`ERROR: ${description}`));

		await this.agenda.every(time.oneDay, id);
	};
}
