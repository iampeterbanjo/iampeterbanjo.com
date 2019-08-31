import utils from '../src/utils';
import casual from 'casual';

const { slugger } = utils;

export default function make() {
	const title = casual.title;
	const artist = casual.full_name;

	return {
		artist,
		title,
		summary: casual.sentences(),
		image: casual.url,
		profileUrl: slugger.slugify(`${artist} ${title}`),
		lastFmUrl: casual.url,
	};
}
