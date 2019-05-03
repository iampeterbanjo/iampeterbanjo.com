const blogHelpers = require('../blog/helpers');

/**
 * View blog post
 * @param {string} post filename
 * @return {object} data
 */
const viewBlogPost = post => blogHelpers.getBlogContents(post);

const viewBlogList = () => blogHelpers.getBlogFiles();

module.exports = {
	viewBlogPost,
	viewBlogList,
};
