import mongoose from 'mongoose';
import Boom from '@hapi/boom';
import util from 'util';

import helpers from './helpers';
import TopTrack from './TopTrack';
import RawTopTrack from './RawTopTrack';
import Profile from './Profile';

mongoose.connect[util.promisify.custom] = (error, db) => {
	return new Promise((resolve, reject) => {
		if (error) return reject(error);
		return resolve(db);
	});
};

export default {
	name: 'models',
	version: '1.0.0',
	register: async server => {
		const { uri, options } = helpers.connex;
		try {
			const { connection } = await mongoose.connect(uri, options);
			server.app.db = {
				link: connection.db,
				TopTrack,
				Profile,
				RawTopTrack,
			};
		} catch (error) {
			return Boom.boomify(error);
		}
	},
};
