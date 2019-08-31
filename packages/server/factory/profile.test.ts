import profile from './profile';
import pipelineHelpers from '../src/pipeline/helpers';

const { checkTrackProfile } = pipelineHelpers;

describe('Given a profile', () => {
	it('When checked there are no validation errors', () => {
		const { error } = checkTrackProfile(profile());

		expect(error).toBeNull();
	});

	it('When profiles are created they should be unique', () => {
		const first = profile();
		const second = profile();

		expect(first).not.toEqual(second);
	});
});
