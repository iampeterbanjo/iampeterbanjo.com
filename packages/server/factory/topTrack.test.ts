import topTrack from './topTrack';
import * as pipelineHelpers from '../src/pipeline/helpers';

const { checkTopTrack } = pipelineHelpers;

describe('Given a topTrack', () => {
	test('When checked there are no validation errors', () => {
		const { error } = checkTopTrack(topTrack());

		expect(error).toBeNull();
	});

	test('When topTracks are created they should be unique', () => {
		const first = topTrack();
		const second = topTrack();

		expect(first).not.toEqual(second);
	});
});
