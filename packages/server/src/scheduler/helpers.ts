import { Api } from '../types';

export default class Helpers {
	server: Api;

	constructor(server) {
		this.server = server;
	}

	async importChartTracks() {
		// console.log(this.server.methods);
		await this.server.methods.korin.getChartTopTracks();
	}
}
