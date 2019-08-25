import { expect } from '@hapi/code';
import Lab from '@hapi/lab';

export const lab = Lab.script();
const { test, suite } = lab;

import config from '../config';

suite('config:', () => {
	test('good is first', () => {
		const { manifest } = config;

		const [first] = manifest.register.plugins;
		expect(first).to.equal('./good');
	});
});
