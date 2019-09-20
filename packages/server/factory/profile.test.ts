import profile from './profile';
import * as pipelineHelpers from '../src/pipeline/helpers';

const { checkTrackProfile } = pipelineHelpers;

describe('Given a profile', () => {
	test('When checked there are no validation errors', () => {
		const { error } = checkTrackProfile(profile());

		expect(error).toBeNull();
	});

	test('When profiles are created they should be unique', () => {
		const first = profile();
		const second = profile();

		expect(first).not.toEqual(second);
	});
});
