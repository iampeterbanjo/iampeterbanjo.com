const path = require('path');
const { PORT, MONGODB_URI } = process.env;

module.exports = {
	rootPath: path.join(__dirname, '../blog/public/'),
	options: {
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
						uri: MONGODB_URI,
						partition: 'cache',
					},
				},
			},
		],
	},
};
