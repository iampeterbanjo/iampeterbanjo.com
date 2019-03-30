const path = require('path');
const { PORT, MONGODB_ADDON_URI, MONGODB_ADDON_DB } = process.env;
const options = {
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
};

module.exports = {
	rootPath: path.join(__dirname, '../blog/public/'),
	options,
};
