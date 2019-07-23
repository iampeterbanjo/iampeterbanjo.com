const korinGetTopTracks = async ({ server, plugin, fn }) => {
	const methods = [
		{
			name: 'korin.getTopTracks',
			method: fn,
		},
	];
	await server.register({
		plugin,
		options: { methods },
	});
};

const method = async ({ server, plugin, name, fn }) => {
	switch (name) {
		case 'korin.getTopTracks':
			return korinGetTopTracks({ server, plugin, fn });
		default:
			return null;
	}
};

module.exports = {
	method,
};
