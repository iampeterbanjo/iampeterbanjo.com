import { Api } from '../types';

export default class Helpers {
	server: Api;

	constructor(server) {
		this.server = server;
	}

	async importChartTracks() {
		console.info(`Started: scheduled saveRawTopTracks at ${new Date()}`);

		await this.server.methods.pipeline.saveRawTopTracks(this.server);
	}
}
