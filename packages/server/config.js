const { PORT, MONGODB_ADDON_URI, MONGODB_ADDON_DB } = process.env;

const catboxMongodb = require('catbox-mongodb');

const manifest = {
	server: {
		host: '0.0.0.0',
		port: Number(PORT || 8080),
		routes: {
			files: {
				relativeTo: __dirname,
			},
		},
		router: {
			stripTrailingSlash: true,
		},
		debug: {
			request: ['*'],
		},
		cache: [
			{
				name: 'mongodb-cache',
				provider: {
					constructor: catboxMongodb,
					options: {
						uri: MONGODB_ADDON_URI,
						partition: MONGODB_ADDON_DB,
					},
				},
			},
		],
	},
	register: {
		plugins: [
			'./good',
			'./hapi-dev-errors',
			'inert',
			'vision',
			'./views',
			'./statics',
			'./korin',
			'./blog',
			'./cqc',
			'./https-here',
		],
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
