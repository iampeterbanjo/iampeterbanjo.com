const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const posts = require('./pages/posts');
const korin = require('./pages/korin/index');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;
	const blogPage = path.resolve(`./src/templates/blog-post.js`);
	const korinTracksPage = path.resolve(`./src/pages/korin/tracks.js`);

	await posts({ createPage, blogPage, graphql });
	await korin({ createPage, korinTracksPage });
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
