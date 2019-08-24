import Glue from '@hapi/glue';
import { manifest, options } from './config';

export default async function main() {
	try {
		const server = await Glue.compose(
			manifest,
			options
		);

		return server;
	} catch (error) {
		return console.warn(error);
	}
}
