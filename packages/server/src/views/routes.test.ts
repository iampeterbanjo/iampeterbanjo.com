import routes from './routes';
import utils from '../utils';

const { slugger } = utils;

describe('Given Berserker routes', () => {
	describe('And get_berserker', () => {
		const result = routes.get_berserker();

		test('When route properties', () => {
			expect(result).toEqual(
				expect.objectContaining({
					method: 'GET',
					path: '/berserker',
					url: '/berserker',
				}),
			);
		});
	});
});

describe('Given blog view', () => {
	test('When when viewing blog posts', () => {
		const result = routes.get_blog_posts();

		expect(result).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/blog/posts',
				url: '/blog/posts',
			}),
		);
	});

	test('When when viewing blog details', () => {
		const post = 'the-problem-with-problems';
		const result = routes.get_blog_details(post);

		expect(result).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/blog/posts/{post}',
				url: `/blog/posts/${post}`,
			}),
		);
	});
});

describe('Given korin views', () => {
	test('When when viewing tracks', () => {
		const result = routes.get_korin_tracks();

		expect(result).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/projects/korin/tracks',
				url: '/projects/korin/tracks',
			}),
		);
	});

	test('When when viewing profiles', () => {
		const artist = 'Ariana Grande';
		const track = 'God is a woman';
		const { method, path, url } = routes.get_korin_profiles({
			artist,
			track,
		});

		expect(method).toEqual('GET');
		expect(path).toEqual('/projects/korin/profiles/{artist}/{track}');
		expect(url).toEqual(expect.stringContaining('/projects/korin/profiles/'));
		expect(url).toEqual(expect.stringContaining(slugger.parse(artist)));
		expect(url).toEqual(expect.stringContaining(slugger.parse(track)));
	});

	test('When when artist and track are missing', () => {
		const result = routes.get_korin_profiles();

		expect(result).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/projects/korin/profiles/{artist}/{track}',
				url: '/projects/korin/profiles//',
			}),
		);
	});
});
