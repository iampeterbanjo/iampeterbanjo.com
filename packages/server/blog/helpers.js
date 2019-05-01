const Path = require('path');
const globby = require('globby');
const matter = require('gray-matter');

const dir = Path.join(__dirname, '../../blog/posts');

/**
 * Get url path to post given file path
 * @param {string} filePath file path
 */
const getUrlPath = filePath => {
	const urlPath = [filePath]
		.map(f => f.replace('.md', ''))
		.map(f => {
			const start = f.indexOf('/blog/posts');
			return f.substr(start);
		});

	return urlPath[0];
};

const getBlogFiles = async () => {
	const blogFiles = await globby(`${dir}/*.md`);
	const urlPaths = blogFiles.map(filePath => {
		const frontmatter = matter.read(filePath);
		const { data = {} } = frontmatter;

		return { ...data, url: getUrlPath(filePath) };
	});

	return urlPaths;
};

/**
 * Get blog and frontmatter
 * @typedef Content
 * @property {string} title
 * @property {string} content
 * @property {Date} date
 *
 * @param {string} filename blog file
 * @return {Promise<Content | null>}
 */
const getBlogContents = async filename => {
	const [blogFile] = await globby(`${dir}/${filename}.md`);

	if (!blogFile) return null;

	const { content, data = {} } = matter.read(blogFile);
	const { title, date } = data;

	return { title, date, content };
};

module.exports = {
	getBlogFiles,
	getBlogContents,
	getUrlPath,
};
