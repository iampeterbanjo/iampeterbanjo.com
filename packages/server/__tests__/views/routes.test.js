const Lab = require('lab');
const { expect } = require('code');
const { slugger } = require('../../utils');
const routes = require('../../views/routes');

const lab = Lab.script();
const { suite, test } = lab;

exports.lab = lab;

suite('blog view', () => {
	test('when viewing blog posts', () => {
		const result = routes.get_blog_posts();

		expect(result).to.include({
			method: 'GET',
			path: '/blog/posts',
			url: '/blog/posts',
		});
	});

	test('when viewing blog details', () => {
		const post = 'the-problem-with-problems';
		const result = routes.get_blog_details(post);

		expect(result).to.include({
			method: 'GET',
			path: '/blog/posts/{post}',
			url: `/blog/posts/${post}`,
		});
	});
});

suite('korin views', () => {
	test('when viewing tracks', () => {
		const hope = routes.get_korin_tracks();

		expect(hope).to.include({
			method: 'GET',
			path: '/korin/tracks',
			url: '/korin/tracks',
		});
	});

	test('when viewing profiles', () => {
		const artist = 'Ariana Grande';
		const track = 'God is a woman';
		const { method, path, url } = routes.get_korin_profiles({
			artist,
			track,
		});

		expect(method).to.equal('GET');
		expect(path).to.equal('/korin/profiles/{artist}/{track}');
		expect(url).to.include('/korin/profiles/');
		expect(url).to.include(slugger.parse(artist));
		expect(url).to.include(slugger.parse(track));
	});

	test('when artist and track are missing', () => {
		const result = routes.get_korin_profiles();

		expect(result).to.include({
			method: 'GET',
			path: '/korin/profiles/{artist}/{track}',
			url: '/korin/profiles//',
		});
	});
});