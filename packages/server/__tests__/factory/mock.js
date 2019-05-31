const sinon = require('sinon');
const topTracksData = require('../fixtures/lastfm-topTracks.json');

const korinGetTopTracks = async ({ server, plugin }) => {
	const methods = [
		{
			name: 'korin.getTopTracks',
			method: sinon.stub().resolves(topTracksData),
		},
	];
	await server.register({
		plugin,
		options: { methods },
	});
};

const method = async ({ server, plugin, name }) => {
	switch (name) {
		case 'korin.getTopTracks':
			return korinGetTopTracks({ server, plugin });
		default:
			return null;
	}
};

module.exports = {
	method,
};
