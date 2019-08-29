// import Lab from '@hapi/lab';
// import { expect } from '@hapi/code';
// import R from 'ramda';
// import helpers from '../../pipeline/helpers';
// import factory from '../factory';

// const topTracksData = require('../fixtures/lastfm-topTracks.json');

// const { checkTopTrack, checkRawTopTrack } = helpers;
// export const lab = Lab.script();
// const { test, suite } = lab;

// Given('Given pipeline helpers', () => {
// 	And(' checkTopTrack', () => {
// 		Given('When topTrack is invalid', () => {
// 			When('an error is thrown for an empty object', async () => {
// 				const error = await expect(checkTopTrack({})).to.reject();

// 				expect(error).to.be.an.error();
// 			});

// 			['title', 'image', 'artist', 'lastFmUrl'].forEach(prop => {
// 				test(`missing ${prop} throws an error`, async () => {
// 					const [topTrack] = factory.topTrack(1);

// 					const { details } = await expect(
// 						checkTopTrack(R.omit([prop], topTrack)),
// 					).to.reject();
// 					const [error] = details;

// 					expect(error).to.include({ path: [prop] });
// 				});
// 			});
// 		});

// 		Given('When topTrack is valid', () => {
// 			When('error is not thrown', async () => {
// 				const [topTrack] = factory.topTrack(1);

// 				await expect(checkTopTrack(topTrack)).not.to.reject();
// 			});
// 		});
// 	});

// 	And(' checkRawTopTrack', () => {
// 		Given('When rawTopTrack is invalid', () => {
// 			When('an error is thrown for an empty object', async () => {
// 				const error = await expect(checkRawTopTrack({})).to.reject();

// 				expect(error).to.be.an.error();
// 			});

// 			When('an error is thrown for a partial object', async () => {
// 				const partial = {
// 					name: '7 rings',
// 					artist: {
// 						name: 'Ariana Grande',
// 						mbid: 'f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387',
// 						url: 'https://www.last.fm/music/Ariana+Grande',
// 					},
// 				};

// 				const error = await expect(checkRawTopTrack(partial)).to.reject();

// 				expect(error).to.be.an.error();
// 			});

// 			[
// 				'name',
// 				'duration',
// 				'playcount',
// 				'listeners',
// 				'url',
// 				'artist',
// 				'image',
// 			].forEach(prop => {
// 				test(`missing ${prop} throws an error`, async () => {
// 					const [topTrackRaw] = R.path(['tracks', 'track'], topTracksData);

// 					const { details } = await expect(
// 						checkRawTopTrack(R.omit([prop], topTrackRaw)),
// 					).to.reject();
// 					const [error] = details;

// 					expect(error).to.include({ path: [prop] });
// 				});
// 			});
// 		});

// 		Given('When topTrack is valid', () => {
// 			When('error is not thrown', async () => {
// 				const [topTrackRaw] = topTracksData.tracks.track;

// 				await expect(checkRawTopTrack(topTrackRaw)).not.to.reject();
// 			});
// 		});
// 	});
// });
