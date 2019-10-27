import importChartTracks from './importChartTracks';
import { lastFmApi } from '../services';
import Database from '../database';
import topTracksJson from '../../fixtures/lastfm-chart.getTopTracks.json';
import { getDbConnection, disconnectAndStopDb } from '../../factory';
import * as helpers from './helpers';

describe('Given ImportChartTracks', () => {
	afterAll(async () => {
		disconnectAndStopDb();
	});

	describe('And ChartTrack and lastFmApi', () => {
		test('When importChartTracks is completed there are only 50 chart tracks saved', async () => {
			const { ChartTrackModel } = await Database.init(getDbConnection);

			jest
				.spyOn(lastFmApi.chart, 'getTopTracks')
				.mockResolvedValue(topTracksJson);
			jest.spyOn(ChartTrackModel, 'deleteMany');
			jest.spyOn(ChartTrackModel, 'insertMany');
			jest.spyOn(helpers, 'parseRawTopTracks');

			await importChartTracks({
				model: ChartTrackModel,
				request: lastFmApi.chart.getTopTracks,
				parser: helpers.parseRawTopTracks,
			});
			const result = await ChartTrackModel.find({});

			expect(lastFmApi.chart.getTopTracks).toHaveBeenCalled();
			expect(ChartTrackModel.deleteMany).toHaveBeenCalled();
			expect(ChartTrackModel.insertMany).toHaveBeenCalled();
			expect(helpers.parseRawTopTracks).toHaveBeenCalled();
			expect(result).toHaveProperty('length', 50);
		});
	});
});
