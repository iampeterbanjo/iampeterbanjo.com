const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const posts = require('./pages/posts');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;
	const blogPage = path.resolve('./src/templates/blog-post.jsx');

	await posts({ createPage, blogPage, graphql });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	if (node.internal.type === 'MarkdownRemark') {
		const value = createFilePath({ node, getNode });
		createNodeField({
			name: 'slug',
			node,
			value,
		});
	}
};