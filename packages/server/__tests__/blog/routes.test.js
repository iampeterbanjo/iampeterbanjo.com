const Lab = require('lab');
const { expect } = require('code');
const routes = require('../../blog/routes');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

suite('blog views', () => {
	test('blog posts route', () => {
		const { method, path, url } = routes.get_blog_posts();

		expect(method).to.equal('GET');
		expect(path).to.equal('/v1/blog/posts');
		expect(url).to.equal('/v1/blog/posts');
	});

	test('blog post details route', () => {
		const post = 'get-a-blog-post';
		const { method, path, url } = routes.get_blog_details(post);

		expect(method).to.equal('GET');
		expect(path).to.equal('/v1/blog/posts/{post}');
		expect(url).to.equal(`/v1/blog/posts/${post}`);
	});
});
