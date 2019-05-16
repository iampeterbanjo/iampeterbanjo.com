const mongoose = require('mongoose');
const util = require('util');
const helpers = require('./helpers');

mongoose.connect[util.promisify.custom] = (error, db) => {
	return new Promise((resolve, reject) => {
		if (error) return reject(error);
		return resolve(db);
	});
};

module.exports = {
	name: 'models',
	version: '1.0.0',
	register: async server => {
		const { uri, options } = helpers.connex;
		try {
			// @ts-ignore
			const { connection } = await mongoose.connect(uri, options);
			// eslint-disable-next-line no-param-reassign
			server.app.db = {
				link: connection.db,
			};
		} catch (error) {
			// eslint-disable-next-line no-console
			console.warn(error);
		}
	},
};
