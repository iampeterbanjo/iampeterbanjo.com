import utils from '.';
import { makeBdd } from '../../factory';

const { Given, When } = makeBdd({ describe, it });
const { slugger } = utils;

Given('parsing and reversing', () => {
	[
		{
			text: 'Ariana Grande',
			parsed: encodeURI('Ariana Grande'),
		},
	].forEach(({ text, parsed }) => {
		When(`${text} is parsed it returns ${parsed} and can be unparsed`, () => {
			const result = slugger.parse(text);

			expect(result).toEqual(parsed);
			expect(slugger.unparse(result)).toEqual(text);
		});
	});
});
