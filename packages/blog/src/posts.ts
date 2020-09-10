import fecha from 'fecha';
import globby from 'globby';
import matter from 'gray-matter';
import marked from 'marked';
import Path from 'path';

export const getFilename = (filePath: string) => {
	const filename = [filePath].map(f => {
		const start = f.lastIndexOf('/');
		return f.substr(start);
	});

	return filename[0].replace('/', '');
};

export const getBlogFiles = async (dir: string) => {
	const blogFiles = await globby(`${dir}/*.md`);
	const urlPaths = blogFiles.map(filePath => {
		const frontmatter = matter.read(filePath);
		const { data = {} } = frontmatter;

		return { ...data, filePath, filename: getFilename(filePath) };
	});

	return urlPaths;
};

type Content = {
	title: string;
	content: string;
	date: string;
};

export const getBlogContents = async (
	filePath: string,
): Promise<Content | null> => {
	const [blogFile] = await globby(filePath);

	if (!blogFile) return null;

	const { content, data = {} } = matter.read(blogFile);
	const { title, date } = data;
	const validDate = fecha.format(new Date(date), 'mediumDate');

	return { title, date: validDate, content: marked(content) };
};
