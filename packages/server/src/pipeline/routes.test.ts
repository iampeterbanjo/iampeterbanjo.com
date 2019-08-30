import routes from './routes';

import { makeBdd } from '../../factory';
const { Given, When } = makeBdd({ describe, it });

Given('pipeline routes', () => {
	When('called /topTracks/extract is correct', () => {
		const result = routes.v1.extract_top_tracks();

		expect(result).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/v1/pipeline/extract/topTracks',
				url: '/v1/pipeline/extract/topTracks',
			}),
		);
	});
});
