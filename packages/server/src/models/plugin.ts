import TopTrack from './TopTrack';
import RawTopTrack from './RawTopTrack';
import Profile from './Profile';

export default {
	name: 'models',
	version: '1.0.0',
	register: async (server, { getDbConnection }) => {
		const { connection } = await getDbConnection();

		try {
			server.app.db = {
				connection,
				TopTrack,
				Profile,
				RawTopTrack,
			};
		} catch (error) {
			console.warn(error);
		}
	},
};
