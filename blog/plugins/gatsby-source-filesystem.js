const contentPath = `${__dirname}/../content`;
const blog = {
	resolve: 'gatsby-source-filesystem',
	options: {
		path: `${contentPath}/blog`,
		name: 'blog',
	},
};

const assets = {
	resolve: 'gatsby-source-filesystem',
	options: {
		path: `${contentPath}/assets`,
		name: 'assets',
	},
};

module.exports = { blog, assets };
