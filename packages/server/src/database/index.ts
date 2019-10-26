import * as mongoose from 'mongoose';

import { MONGODB_ADDON_URI } from '../utils/vars';
import { ChartTrackModel, IChartTrack } from './ChartTrack';
import { DbConnector } from '../../@types';

export interface IDatabase {
	chartTrackModel: mongoose.Model<IChartTrack>;
	uri: string;
	connection: mongoose.Connection;
}

export default {
	init: async (getDbConnection: DbConnector): Promise<IDatabase> => {
		await getDbConnection();

		return {
			chartTrackModel: ChartTrackModel,
			uri: MONGODB_ADDON_URI,
			connection: mongoose.connection,
		};
	},
};
