import ImportChartTracks from './importChartTracks';
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
			const { chartTrackModel } = await Database.init(getDbConnection);

			jest
				.spyOn(lastFmApi.chart, 'getTopTracks')
				.mockResolvedValue(topTracksJson);
			jest.spyOn(chartTrackModel, 'deleteMany');
			jest.spyOn(chartTrackModel, 'insertMany');
			jest.spyOn(helpers, 'parseRawTopTracks');

			await ImportChartTracks({
				chartTrackModel,
				lastFmApi,
				parser: helpers.parseRawTopTracks,
			});
			const result = await chartTrackModel.find({});

			expect(lastFmApi.chart.getTopTracks).toHaveBeenCalled();
			expect(chartTrackModel.deleteMany).toHaveBeenCalled();
			expect(chartTrackModel.insertMany).toHaveBeenCalled();
			expect(helpers.parseRawTopTracks).toHaveBeenCalled();
			expect(result).toHaveProperty('length', 50);
		});
	});
});
