const { expect } = require('code');
const Lab = require('lab');

const lab = Lab.script();
const { test } = lab;

exports.lab = lab;

const config = require('../config');

test('good is first', () => {
	const { manifest } = config;

	const [first] = manifest.register.plugins;
	expect(first).to.equal('./good');
});
