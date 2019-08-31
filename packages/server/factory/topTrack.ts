import faker from 'faker';

export default function make() {
	return {
		artist: faker.name.findName(),
		title: faker.random.words(),
		image: faker.random.image(),
		lastFmUrl: faker.internet.url(),
	};
}
