import mongoose from 'mongoose';

import { MONGODB_ADDON_URI } from './env';
import { ChartTrackModel, IChartTrack } from './ChartTrack';
import { TrackProfileModel, ITrackProfile } from './TrackProfile';
import { DbConnector } from './types';

export interface IDatabase {
	TrackProfileModel: mongoose.Model<ITrackProfile>;
	ChartTrackModel: mongoose.Model<IChartTrack>;
	uri: string;
	connection: mongoose.Connection;
}

export const Database = {
	init: async (getDbConnection: DbConnector): Promise<IDatabase> => {
		await getDbConnection();

		return {
			TrackProfileModel,
			ChartTrackModel,
			uri: MONGODB_ADDON_URI,
			connection: mongoose.connection,
		};
	},
};
