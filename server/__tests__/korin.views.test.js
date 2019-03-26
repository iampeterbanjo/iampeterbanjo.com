const Hapi = require('hapi');
const { expect } = require('code');
const { test, suite } = (exports.lab = require('lab').script());
const sinon = require('sinon');
const readFile = require('fs-extra').readFile;
const path = require('path');

const setup = async options => {
	const server = new Hapi.Server();

	const lyrics = await readFile(`${__dirname}/fixtures/lyrics.txt`);
	const topTracks = require('./fixtures/lastfm-topTracks.json');
	const profile = require('./fixtures/personality-profile.json');
	const getLyrics = sinon.stub().resolves(lyrics);
	const getPersonalityProfile = sinon.stub().resolves(profile);
	const personalityProfileApi = sinon.stub();
	const getTopTracks = sinon.stub().resolves(topTracks);
	const getMediaType = require('accept').mediaType;
	const templatesPath = path.join(__dirname, '../views/templates');
	const defaults = {
		getLyrics,
		getTopTracks,
		getPersonalityProfile,
		getMediaType,
		personalityProfileApi,
	};

	await server.register({
		plugin: require('../../server/korin/api'),
		options: {
			...defaults,
			...options,
		},
	});

	await server.register({
		plugin: require('vision'),
		options: {
			engines: { ejs: require('ejs') },
			path: templatesPath,
		},
	});

	// await server.register({
	// 	plugin: require('../../server/views'),
	// 	options: { path: path.join(__dirname, '../views/templates') },
	// });

	return {
		server,
		lyrics,
		profile,
		topTracks,
		...defaults,
	};
};

suite('content negotiation', () => {
	const assertions = ['text/html', 'application/json'];
	assertions.forEach(accept => {
		test(`given 'text/html' in headers view responds with the correct content-type`, async () => {
			const { server } = await setup();

			const response = await server.inject({
				method: 'GET',
				url: '/korin/songs',
				headers: {
					accept,
				},
			});

			expect(response.headers['content-type']).to.contain(accept);
		});
	});
});

suite('render content', () => {
	test.skip(`given text/html page should respond with header and footer`, async () => {
		const { server } = await setup();
		const { payload } = await server.inject({
			method: 'GET',
			url: '/korin/songs',
			headers: {
				accept: 'text/html',
			},
		});

		expect(payload).to.contain(`<header>`);
		expect(payload).to.contain(`<footer>`);
	});
});
