const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

const config = require('../config');

suite('config:', () => {
	test('good is first', () => {
		const { manifest } = config;

		const [first] = manifest.register.plugins;
		expect(first).to.equal('./good');
	});
});
