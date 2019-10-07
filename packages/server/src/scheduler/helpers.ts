import { Api } from '../types';

export default class Helpers {
	server: Api;

	constructor(server) {
		this.server = server;
	}

	async importChartTracks() {
		await this.server.methods.korin.getChartTopTracks();
	}
}
