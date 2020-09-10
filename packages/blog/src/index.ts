import * as fs from 'fs-extra';
import { getBlogContents, getBlogFiles } from './posts';
import Path from 'path';
import lodash from 'lodash/fp';

export const fileDir = Path.join(__dirname, '../posts');

export const buildDir = Path.join(__dirname, '../build/posts');

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
			const destination = `${buildDir}/${c.filename}.json`;

			await fs
				.createFile(destination)
				.then(f => fs.writeFile(destination, formatStringify(c.data)));
		}),
	);

	const [first] = files;
	const indexFile = `${buildDir}/index.json`;
	const index = formatStringify({
		first,
		last: files.slice(-1)[0],
		list: files,
	});
	await fs.createFile(indexFile).then(f => fs.writeFile(indexFile, index));
};

(async () => {
	await output();
})();
