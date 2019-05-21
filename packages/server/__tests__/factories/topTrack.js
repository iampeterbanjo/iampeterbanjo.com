const faker = require('faker');

const title = faker.random.words();
const artist = faker.name.findName();

module.exports = {
	artist,
	title,
	image: faker.random.boolean() ? faker.random.image() : '',
	lastFmUrl: faker.internet.url(),
};
