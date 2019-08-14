const faker = require('faker');
const { slugger } = require('../../utils');

const title = faker.random.words();
const artist = faker.name.findName();

module.exports = {
	artist,
	title,
	summary: faker.lorem.sentences(),
	image: faker.random.image(),
	profileUrl: slugger.slugify(`${artist} ${title}`),
	lastFmUrl: faker.internet.url(),
};