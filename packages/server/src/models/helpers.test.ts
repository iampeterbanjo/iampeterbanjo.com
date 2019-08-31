import Bluebird from 'bluebird';

import utils from '../../src/utils';
import helpers from '../../src/models/helpers';

const { vars } = utils;
const { connex } = helpers;
const { MONGODB_ADDON_URI, MONGODB_ADDON_DB } = vars;

describe('GivenGiven model `connex` helper', () => {
	describe('And`isTest` is true', () => {
		it('When connected dbName is correct', () => {
			expect(connex.dbName(true)).toEqual('test');
		});
	});

	describe('And`isTest` is false', () => {
		it('When connected dbName is correct', () => {
			expect(connex.dbName()).toEqual(MONGODB_ADDON_DB);
		});
	});

	it('When connected uri is correct', () => {
		expect(connex.uri).toEqual(MONGODB_ADDON_URI);
	});

	describe('And`connex.options`', () => {
		const { options } = connex;

		it('When set useNewUrlParser is true', () => {
			expect(options.useNewUrlParser).toEqual(true);
		});

		it('When set dbName is correct', () => {
			expect(options.dbName).toEqual('test');
		});

		it('When set promise library is Bluebird', () => {
			expect(options.promiseLibrary).toEqual(Bluebird);
		});
	});
});
