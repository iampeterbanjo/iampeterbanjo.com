import { CmsPosts, Posts } from '@iampeterbanjo/types';
import fecha from 'fecha';
import globby from 'globby';
import matter from 'gray-matter';
import lodash from 'lodash/fp';
import marked from 'marked';

export const getFilename = (filePath: string) => {
	const filename = [filePath].map(f => {
		const start = f.lastIndexOf('/');
		return f.substr(start);
	});

	return filename[0].replace('/', '');
};

type GetBlogFiles = (dir: string) => Promise<CmsPosts[]>;

const getfrontMatter = (filePath: string) => {
	if (!filePath) {
		return {} as any;
	}

	const { content, data = {} as Posts } = matter.read(filePath);
	const frontmatter = data as Posts;

	return { ...frontmatter, content };
};

export const getBlogFiles: GetBlogFiles = async dir => {
	const blogFiles = await globby(`${dir}/*.md`);
	const urlPaths = blogFiles.map((filePath, index) => {
		const { content, ...frontMatter } = getfrontMatter(filePath);
		const prev = getfrontMatter(lodash.get(index - 1, blogFiles));
		const next = getfrontMatter(lodash.get(index + 1, blogFiles));

		return {
			...frontMatter,
			content: marked(content),
			filePath,
			filename: getFilename(filePath),
			prev,
			next,
		};
	});

	return urlPaths;
};

type Content = {
	title: string;
	content: string;
	date: string;
};

export const formatDate = (date: string) =>
	fecha.format(new Date(date), 'mediumDate');

export const getBlogContents = async (
	filePath: string,
): Promise<Content | null> => {
	const [blogFile] = await globby(filePath);

	if (!filePath || !blogFile) {
		return null;
	}

	const { content, data = {} } = matter.read(blogFile);
	const { title, date } = data;
	const validDate = formatDate(date);

	return { title, date: validDate, content: marked(content) };
};
