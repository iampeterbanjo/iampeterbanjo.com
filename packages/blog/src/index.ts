import * as fs from 'fs-extra';
import { getBlogContents, getBlogFiles } from './posts';
import Path from 'path';

export const fileDir = Path.join(__dirname, '../posts');

export const buildDir = Path.join(__dirname, '../build/posts');

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
		contents.map(async c => {
			const destination = `${buildDir}/${c.filename}.json`;
			await fs
				.createFile(destination)
				.then(f => fs.writeFile(destination, JSON.stringify(c.data, null, 1)));
		}),
	);
};

(async () => {
	await output();
})();
