import * as fs from 'fs-extra';
import Path from 'path';
import { getBlogContents, getBlogFiles } from './posts';

export const fileDir = Path.join(__dirname, '../posts');

export const buildDir = Path.join(__dirname, '../build');

export const formatStringify = (data: object | null = {}) =>
	JSON.stringify(data, null, 1);

const output = async () => {
	await fs.mkdirp(buildDir);

	const files = await getBlogFiles(fileDir);
	const contents = await Promise.all(
		files.map(async f => {
			const data = await getBlogContents(f.filePath);

			return { ...f, data };
		}),
	);

	await Promise.all(
		contents.map(async (c, index) => {
			const destination = `${buildDir}/${c.filename}.js`;
			const fileData = `module.exports = ${formatStringify(c.data)}`;

			await fs
				.createFile(destination)
				.then(f => fs.writeFile(destination, fileData));
		}),
	);

	const [first] = contents;
	const indexFile = `${buildDir}/index.js`;
	const index = formatStringify({
		first,
		last: contents.slice(-1)[0],
		posts: contents,
	});
	const filesData = `module.exports = ${index}`;

	await fs.createFile(indexFile).then(f => fs.writeFile(indexFile, filesData));
};

(async () => {
	await output();
})();
