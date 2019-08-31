import topTrack from './topTrack';
import pipelineHelpers from '../src/pipeline/helpers';

const { checkTopTrack } = pipelineHelpers;

describe('Given a topTrack', () => {
	it('When checked there are no validation errors', () => {
		const { error } = checkTopTrack(topTrack());

		expect(error).toBeNull();
	});

	it('When topTracks are created they should be unique', () => {
		const first = topTrack();
		const second = topTrack();

		expect(first).not.toEqual(second);
	});
});
