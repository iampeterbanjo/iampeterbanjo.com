import routes from './routes';

describe('Given blog api', () => {
	test('When its called, blog posts route has expected method, path, url', () => {
		const { method, path, url } = routes.v1.get_blog_posts();

		expect(method).toEqual('GET');
		expect(path).toEqual('/v1/blog/posts');
		expect(url).toEqual('/v1/blog/posts');
	});

	test('When its called, blog post details route has correct method, path, url', () => {
		const post = 'get-a-blog-post';
		const { method, path, url } = routes.v1.get_blog_details(post);

		expect(method).toEqual('GET');
		expect(path).toEqual('/v1/blog/posts/{post}');
		expect(url).toEqual(`/v1/blog/posts/${post}`);
	});

	test('When its called, blog post details has correct url without filename', () => {
		const { url } = routes.v1.get_blog_details();

		expect(url).toEqual('/v1/blog/posts/');
	});
});
