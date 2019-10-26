import * as R from 'ramda';

import * as helpers from './helpers';
import factory from '../../factory';
import topTracksData from '../../fixtures/lastfm-chart.getTopTracks.json';
import rawTopTracks from '../../fixtures/saved-chart.getTopTracks.json';

const {
	checkTopTrack,
	checkRawTopTrack,
	checkTopTrackPartial,
	parseTopTracksPartial,
	parseRawTopTracks,
} = helpers;

describe('test', () => {
	it('should pass', () => {});
});
describe('Given pipeline helpers', () => {
	describe('And parseRawTopTracks', () => {
		test('When converted to TopTrack it is valid', async () => {
			const [result] = parseRawTopTracks(topTracksData);

			expect(checkRawTopTrack(result)).resolves.toBeTruthy();
		});
	});

	describe('And parseTopTracks', () => {
		test('When converted to TopTrack it is valid', async () => {
			const [result] = parseTopTracksPartial(rawTopTracks);

			expect(checkTopTrackPartial(result)).resolves.toBeTruthy();
		});
	});

	describe('And checkTopTrack', () => {
		test('When topTrack is invalid an error is thrown', async () => {
			expect(checkTopTrack({})).rejects.toThrow();
		});

		['title', 'spotify', 'artist', 'lastFmUrl'].forEach(prop => {
			it(`When missing ${prop} throws an error`, async () => {
				const [topTrack] = factory.topTrack(1);
				const partialTrack = R.omit([prop], topTrack);
				const { error } = checkTopTrack(partialTrack);
				const [details] = error.details;

				expect(details.message).toEqual(
					expect.stringContaining(`"${prop}" is required`),
				);
			});
		});

		describe('Given topTrack is valid', () => {
			test('When error is not thrown', async () => {
				const [topTrack] = factory.topTrack(1);

				expect(checkTopTrack(topTrack)).resolves.toBeTruthy();
			});
		});
	});

	describe('And checkRawTopTrack', () => {
		describe('Given rawTopTrack is invalid', () => {
			test('When an error is thrown for an empty object', async () => {
				expect(checkRawTopTrack({})).rejects.toThrow();
			});

			test('When an error is thrown for a partial object', async () => {
				const partial = {
					name: '7 rings',
					artist: {
						name: 'Ariana Grande',
						mbid: 'f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387',
						url: 'https://www.last.fm/music/Ariana+Grande',
					},
				};

				expect(checkRawTopTrack(partial)).rejects.toThrow();
			});

			[
				'name',
				'duration',
				'playcount',
				'listeners',
				'url',
				'artist',
				'image',
			].forEach(prop => {
				it(`When missing ${prop} throws an error`, async () => {
					const [topTrackRaw] = R.pathOr(
						{},
						['tracks', 'track'],
						topTracksData,
					) as any;
					const partialTrack = R.omit([prop], topTrackRaw);
					const { error } = checkRawTopTrack(partialTrack);
					const [details] = error.details;

					expect(details.message).toEqual(
						expect.stringContaining(`"${prop}" is required`),
					);
				});
			});
		});

		describe('Given topTrack is valid', () => {
			test('When error is not thrown', async () => {
				const [topTrackRaw] = topTracksData.tracks.track;

				expect(checkRawTopTrack(topTrackRaw)).resolves.toBeTruthy();
			});
		});
	});
});
