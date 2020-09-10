import fecha from 'fecha';
import globby from 'globby';
import matter from 'gray-matter';
import marked from 'marked';

export const getFilename = (filePath: string) => {
	const filename = [filePath].map(f => {
		const start = f.lastIndexOf('/');
		return f.substr(start);
	});

	return filename[0].replace('/', '');
};

type FrontMatter = {
	title: string;
	date: string;
	content: string;
};

type GetBlogFiles = (
	dir: string,
) => Promise<
	{
		title: string;
		date: string;
		content: string;
		filePath: string;
		filename: string;
	}[]
>;

export const getBlogFiles: GetBlogFiles = async dir => {
	const blogFiles = await globby(`${dir}/*.md`);
	const urlPaths = blogFiles.map(filePath => {
		const { data = {} as FrontMatter } = matter.read(filePath);
		const frontmatter = data as FrontMatter;

		return { ...frontmatter, filePath, filename: getFilename(filePath) };
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

	if (!filePath || !blogFile) {
		return null;
	}

	const { content, data = {} } = matter.read(blogFile);
	const { title, date } = data;
	const validDate = fecha.format(new Date(date), 'mediumDate');

	return { title, date: validDate, content: marked(content) };
};
