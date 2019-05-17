const faker = require('faker');
const { slugger } = require('../../utils');

const title = faker.random.words();
const artist = faker.name.findName();

module.exports = {
	artist,
	title,
	image: faker.random.boolean() ? faker.random.image() : '',
	profileUrl: slugger.slugify(`${artist} ${title}`),
	lastFmUrl: faker.internet.url(),
};
