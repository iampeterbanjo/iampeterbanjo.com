import getTopTrack from './topTrack';
import getProfile from './profile';
import * as mock from './mock';
import * as R from 'ramda';

type TopTrack = {
	artist: string;
	title: string;
	image: string;
	lastFmUrl: string;
};

type Profile = TopTrack & {
	summary: string;
	profileUrl: string;
};

const generate = (
	count: number,
	item: () => TopTrack | Profile,
): TopTrack[] | Profile[] => {
	return R.range(0, count).map(() => item());
};

const builder = {
	topTrack: count => generate(count, getTopTrack),
	profile: count => generate(count, getProfile),
	mock,
};

export default builder;
