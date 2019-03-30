const { PORT, MONGODB_ADDON_URI, MONGODB_ADDON_DB } = process.env;

const manifest = {
	server: {
		host: '0.0.0.0',
		port: Number(PORT || 8080),
		routes: {
			files: {
				relativeTo: __dirname,
			},
		},
		cache: [
			{
				name: 'mongodb-cache',
				provider: {
					constructor: require('catbox-mongodb'),
					options: {
						uri: MONGODB_ADDON_URI,
						partition: MONGODB_ADDON_DB,
					},
				},
			},
		],
	},
	register: {
		plugins: ['good', 'inert', './statics', './korin', './cqc', './https-here'],
		options: {
			once: true,
		},
	},
};

const options = {
	relativeTo: __dirname,
};

module.exports = {
	manifest,
	options,
};
