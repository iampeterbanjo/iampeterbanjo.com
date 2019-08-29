// import Lab from '@hapi/lab';
// import { expect } from '@hapi/code';
// import utils from '../../utils';
// import routes from '../../views/routes';

// export const lab = Lab.script();
// const { suite, test } = lab;
// const { slugger } = utils;

// Given('Given Berserker routes', () => {
// 	And(' get_berserker', () => {
// 		const result = routes.get_berserker();

// 		When('route properties', () => {
// 			expect(result).to.include({
// 				method: 'GET',
// 				path: '/berserker',
// 				url: '/berserker',
// 			});
// 		});
// 	});
// });

// Given('blog view', () => {
// 	When('when viewing blog posts', () => {
// 		const result = routes.get_blog_posts();

// 		expect(result).to.include({
// 			method: 'GET',
// 			path: '/blog/posts',
// 			url: '/blog/posts',
// 		});
// 	});

// 	When('when viewing blog details', () => {
// 		const post = 'the-problem-with-problems';
// 		const result = routes.get_blog_details(post);

// 		expect(result).to.include({
// 			method: 'GET',
// 			path: '/blog/posts/{post}',
// 			url: `/blog/posts/${post}`,
// 		});
// 	});
// });

// Given('korin views', () => {
// 	When('when viewing tracks', () => {
// 		const hope = routes.get_korin_tracks();

// 		expect(hope).to.include({
// 			method: 'GET',
// 			path: '/projects/korin/tracks',
// 			url: '/projects/korin/tracks',
// 		});
// 	});

// 	When('when viewing profiles', () => {
// 		const artist = 'Ariana Grande';
// 		const track = 'God is a woman';
// 		const { method, path, url } = routes.get_korin_profiles({
// 			artist,
// 			track,
// 		});

// 		expect(method).toEqual('GET');
// 		expect(path).toEqual('/projects/korin/profiles/{artist}/{track}');
// 		expect(url).to.include('/projects/korin/profiles/');
// 		expect(url).to.include(slugger.parse(artist));
// 		expect(url).to.include(slugger.parse(track));
// 	});

// 	When('when artist and track are missing', () => {
// 		const result = routes.get_korin_profiles();

// 		expect(result).to.include({
// 			method: 'GET',
// 			path: '/projects/korin/profiles/{artist}/{track}',
// 			url: '/projects/korin/profiles//',
// 		});
// 	});
// });
