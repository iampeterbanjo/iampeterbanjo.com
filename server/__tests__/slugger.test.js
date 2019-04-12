const { expect } = require('code');
const Lab = require('lab');
const { slugger } = require('../utils');

const lab = Lab.script();
const { test, suite } = lab;

exports.lab = lab;

suite('parsing and reversing', () => {
	[
		{
			text: 'Ariana Grande',
			parsed: encodeURI('Ariana Grande'),
		},
	].forEach(({ text, parsed }) => {
		test(`that ${text} should return ${parsed} and can be unparsed`, () => {
			const result = slugger.parse(text);

			expect(result).to.equal(parsed);
			expect(slugger.unparse(result)).to.equal(text);
		});
	});
});
