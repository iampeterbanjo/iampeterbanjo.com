import getTopTrack from './topTrack';
import getProfile from './profile';
import * as mock from './mock';
import * as R from 'ramda';

const generate = (
	count: number,
	item: () => TopTrack | Profile,
): TopTrack[] | Profile[] => {
	return R.range(0, count).map(() => item());
};

const builder = {
	topTrack: (count: number) => generate(count, getTopTrack),
	profile: (count: number) => generate(count, getProfile),
	mock,
};

export default builder;
