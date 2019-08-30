import { makeBdd } from '../../factory';
const { Given, And, When } = makeBdd({ describe, it });
import routes from './routes';
import utils from '../utils';

const { slugger } = utils;

Given('Given Berserker routes', () => {
	And(' get_berserker', () => {
		const result = routes.get_berserker();

		When('route properties', () => {
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

Given('blog view', () => {
	When('when viewing blog posts', () => {
		const result = routes.get_blog_posts();

		expect(result).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/blog/posts',
				url: '/blog/posts',
			}),
		);
	});

	When('when viewing blog details', () => {
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

Given('korin views', () => {
	When('when viewing tracks', () => {
		const hope = routes.get_korin_tracks();

		expect(hope).toEqual(
			expect.objectContaining({
				method: 'GET',
				path: '/projects/korin/tracks',
				url: '/projects/korin/tracks',
			}),
		);
	});

	When('when viewing profiles', () => {
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

	When('when artist and track are missing', () => {
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
