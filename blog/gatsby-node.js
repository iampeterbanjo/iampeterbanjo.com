const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const posts = require('./pages/posts');

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;
	const blogPost = path.resolve(`./src/templates/blog-post.js`);

	posts({ createPage, blogPost, graphql });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode });
		createNodeField({
			name: `slug`,
			node,
			value,
		});
	}
};
