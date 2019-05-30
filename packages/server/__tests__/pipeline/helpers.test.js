const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const Joi = require('@hapi/joi');

const lab = Lab.script();
const { test, suite } = lab;
const { checkTopTrack } = require('../../pipeline/helpers');
const factory = require('../factory');

exports.lab = lab;

suite('Given pipeline helpers', () => {
	suite('And checkTopTrack', () => {
		suite('When topTrack is invalid', () => {
			test('has an isJoi property', async () => {
				const error = await expect(
					Joi.validate('bar', Joi.valid('foo'))
				).to.reject();

				expect(error).to.be.an.error();
				expect(error.isJoi).to.be.true();
			});

			test('an error is thrown for an empty object', async () => {
				const error = await expect(checkTopTrack({})).to.reject();

				expect(error).to.be.an.error();
			});

			['title', 'image', 'artist', 'lastFmUrl'].forEach(prop => {
				test(`missing ${prop} throws an error`, async () => {
					const [topTrack] = factory.topTrack(1);
					delete topTrack[prop];

					const { details } = await expect(checkTopTrack(topTrack)).to.reject();
					const [error] = details;

					expect(error).to.include({ path: [prop] });
				});
			});
		});

		suite('When topTrack is valid', () => {
			test('error is not thrown', async () => {
				const [topTrack] = factory.topTrack(1);

				await expect(checkTopTrack(topTrack)).not.to.reject();
			});
		});
	});
});
