// after changse rum `pnpm m up --depth 999`
module.exports = {
	hooks: {
		readPackage: function(manifest) {
			switch (manifest.name) {
				case '@hapi/good':
					Object.assign(manifest.peerDependencies, {
						'@hapi/good-console': '*',
						'@hapi/good-squeeze': '*',
					});
			}
			return manifest;
		},
	},
};
