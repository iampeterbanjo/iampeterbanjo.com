import Path from 'path';
import globby from 'globby';
import matter from 'gray-matter';
import marked from 'marked';
import fecha from 'fecha';

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
	const validDate = fecha.format(new Date(date), 'mediumDate');

	return { title, date: validDate, content: marked(content) };
};

export default  {
	getBlogFiles,
	getBlogContents,
	getUrlPath,
};
