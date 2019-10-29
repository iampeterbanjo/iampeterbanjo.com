import transformChartTracks from './transformChartTracks';
import Database from '../database';
import savedTopTracksJson from '../../fixtures/saved-chart.getTopTracks.json';
import spotifyArtistJson from '../../fixtures/spotify-api-artist-search.json';
import { getDbConnection, disconnectAndStopDb } from '../../factory';
import * as helpers from './helpers';
import { getSpotifyArtist, getSpotifyApi } from '../korin/helpers';
import casual from 'casual';
import profile from '../../fixtures/personality-profile.json';

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
				transformation: helpers.addProfileAndSpotifyData,
				target: TrackProfileModel,
				requestArtist: jest.fn().mockResolvedValue(spotifyArtistJson),
				requestProfile: jest.fn().mockResolvedValue({
					summary: casual.sentences(3),
					profile,
					lyrics: casual.sentences(4),
				}),
			});
			const result = await TrackProfileModel.find();
			const { error } = helpers.checkTrackProfile(result[0]);

			expect(TrackProfileModel.deleteMany).toHaveBeenCalled();
			expect(TrackProfileModel.insertMany).toHaveBeenCalled();
			expect(result).toHaveProperty('length', 50);
			expect(error).toBeFalsy();
		});
	});
});
