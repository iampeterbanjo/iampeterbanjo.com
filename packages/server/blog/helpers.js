const Path = require('path');
const globby = require('globby');
const { readFile } = require('fs-extra');

const dir = Path.join(__dirname, '../../blog/posts');

const getBlogFiles = async () => {
	const blogFiles = await globby(`${dir}/*.md`);

	return blogFiles;
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
};
