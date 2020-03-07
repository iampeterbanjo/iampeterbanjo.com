import mongoose, { Model } from 'mongoose';
import { IChartTrack } from './ChartTrack';

export interface Connection {
	uri: string;
	connection: mongoose.Connection;
}

export type DbConnector = () => Promise<Connection>;

export type IChartTrackModel = Model<IChartTrack>;
