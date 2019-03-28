const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const posts = require('./pages/posts');
const songs = require('./pages/korin/songs');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;
	const blogPage = path.resolve(`./src/templates/blog-post.js`);
	const songPage = path.resolve(`./src/pages/korin/songs.js`);

	await posts({ createPage, blogPage, graphql });
	await songs({ createPage, songPage });
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
