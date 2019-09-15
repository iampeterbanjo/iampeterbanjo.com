export default class Helpers {
	server: any;

	constructor(server) {
		this.server = server;
	}

	async importChartTracks() {
		await this.server.methods.korin.getChartTopTracks();
	}
}
