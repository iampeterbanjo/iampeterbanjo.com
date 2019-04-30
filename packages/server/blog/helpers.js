const Path = require('path');
const globby = require('globby');
const { readFile } = require('fs-extra');

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
		return getUrlPath(filePath);
	});

	return urlPaths;
};

const getBlogContents = async filename => {
	const [blogFile] = await globby(`${dir}/${filename}.md`);

	if (!blogFile) return '';

	const contents = await readFile(blogFile);

	return contents;
};

module.exports = {
	getBlogFiles,
	getBlogContents,
	getUrlPath,
};
