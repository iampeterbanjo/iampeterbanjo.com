import R from 'ramda';

import helpers from './helpers';
import factory from '../../factory';
import topTracksData from '../../fixtures/lastfm-topTracks.json';

const { checkTopTrack, checkRawTopTrack } = helpers;

describe('GivenGiven pipeline helpers', () => {
	describe('And checkTopTrack', () => {
		it('When topTrack is invalid an error is thrown', async () => {
			expect(checkTopTrack({})).rejects.toThrow();
		});

		['title', 'image', 'artist', 'lastFmUrl'].forEach(prop => {
			it(`When missing ${prop} throws an error`, async () => {
				const [topTrack] = factory.topTrack(1);

				expect(checkTopTrack(R.omit([prop], topTrack))).rejects.toThrow(
					expect.objectContaining({
						name: 'ValidationError',
						message: expect.stringContaining(prop),
					}),
				);
			});
		});

		describe('GivenWhen topTrack is valid', () => {
			it('When error is not thrown', async () => {
				const [topTrack] = factory.topTrack(1);

				expect(checkTopTrack(topTrack)).resolves.toBeTruthy();
			});
		});
	});

	describe('And checkRawTopTrack', () => {
		describe('GivenWhen rawTopTrack is invalid', () => {
			it('When an error is thrown for an empty object', async () => {
				expect(checkRawTopTrack({})).rejects.toThrow();
			});

			it('When an error is thrown for a partial object', async () => {
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
					const [topTrackRaw] = R.path(['tracks', 'track'], topTracksData);

					expect(checkRawTopTrack(R.omit([prop], topTrackRaw))).rejects.toThrow(
						expect.objectContaining({
							name: 'ValidationError',
							message: expect.stringContaining(prop),
						}),
					);
				});
			});
		});

		describe('GivenWhen topTrack is valid', () => {
			it('When error is not thrown', async () => {
				const [topTrackRaw] = topTracksData.tracks.track;

				expect(checkRawTopTrack(topTrackRaw)).resolves.toBeTruthy();
			});
		});
	});
});
