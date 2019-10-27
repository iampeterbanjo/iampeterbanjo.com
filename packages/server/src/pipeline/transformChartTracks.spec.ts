import transformChartTracks from './transformChartTracks';
import Database from '../database';
import savedTopTracksJson from '../../fixtures/saved-chart.getTopTracks.json';
import { getDbConnection, disconnectAndStopDb } from '../../factory';
import * as helpers from './helpers';

describe('Given imported chart tracks', () => {
	afterAll(() => {
		disconnectAndStopDb();
	});

	describe('transformChartTracks', () => {
		test('When transformChartTracks completes 50 profiles are generated', async () => {
			const { TrackProfileModel, ChartTrackModel } = await Database.init(
				getDbConnection,
			);

			jest
				.spyOn(ChartTrackModel, 'find')
				.mockResolvedValue(savedTopTracksJson as any);
			jest.spyOn(TrackProfileModel, 'deleteMany');
			jest.spyOn(TrackProfileModel, 'insertMany');

			await transformChartTracks({
				source: ChartTrackModel,
				transformation: helpers.parseTopTracksPartial,
				model: TrackProfileModel,
			});
			const result = await TrackProfileModel.find();

			expect(TrackProfileModel.deleteMany).toHaveBeenCalled();
			expect(TrackProfileModel.insertMany).toHaveBeenCalled();
			expect(result).toHaveProperty('length', 50);
		});
	});
});
