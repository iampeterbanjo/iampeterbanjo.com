module.exports = async ({ createPage, blogPage, graphql }) => {
	const result = await graphql(
		`
			{
				allMarkdownRemark(
					sort: { fields: [frontmatter___date], order: DESC }
					limit: 1000
				) {
					edges {
						node {
							fields {
								slug
							}
							frontmatter {
								title
							}
						}
					}
				}
			}
		`
	);

	if (result.errors) {
		throw result.errors;
	}

	// Create blog posts pages.
	const posts = result.data.allMarkdownRemark.edges;

	posts.forEach((post, index) => {
		const previous = index === posts.length - 1 ? null : posts[index + 1].node;
		const next = index === 0 ? null : posts[index - 1].node;

		createPage({
			path: post.node.fields.slug,
			component: blogPage,
			context: {
				slug: post.node.fields.slug,
				previous,
				next,
			},
		});
	});
};
