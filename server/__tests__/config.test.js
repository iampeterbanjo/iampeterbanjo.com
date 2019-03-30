const { expect } = require('code');
const { test } = (exports.lab = require('lab').script());
const config = require('../config');

test('good is first', () => {
	const { manifest } = config;

	const [first] = manifest.register.plugins;
	expect(first).to.equal('good');
});
