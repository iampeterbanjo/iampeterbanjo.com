import faker from 'faker';
import utils from '../src/utils';

const { slugger } = utils;

export default function make() {
	const title = faker.random.words();
	const artist = faker.name.findName();

	return {
		artist,
		title,
		summary: faker.lorem.sentences(),
		image: faker.random.image(),
		profileUrl: slugger.slugify(`${artist} ${title}`),
		lastFmUrl: faker.internet.url(),
	};
}
