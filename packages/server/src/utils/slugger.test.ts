import utils from '.';

const { slugger } = utils;

describe('Given parsing and reversing', () => {
	[
		{
			text: 'Ariana Grande',
			parsed: encodeURI('Ariana Grande'),
		},
	].forEach(({ text, parsed }) => {
		it(`When ${text} is parsed it returns ${parsed} and can be unparsed`, () => {
			const result = slugger.parse(text);

			expect(result).toEqual(parsed);
			expect(slugger.unparse(result)).toEqual(text);
		});
	});
});
