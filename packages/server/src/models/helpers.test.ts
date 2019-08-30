import Bluebird from 'bluebird';

import utils from '../../src/utils';
import helpers from '../../src/models/helpers';
import { makeBdd } from '../../factory';

const { Given, And, When } = makeBdd({ describe, it });
const { vars } = utils;
const { connex } = helpers;
const { MONGODB_ADDON_URI, MONGODB_ADDON_DB } = vars;

Given('Given model `connex` helper', () => {
	And('`isTest` is true', () => {
		When('connected dbName is correct', () => {
			expect(connex.dbName(true)).toEqual('test');
		});
	});

	And('`isTest` is false', () => {
		When('connected dbName is correct', () => {
			expect(connex.dbName()).toEqual(MONGODB_ADDON_DB);
		});
	});

	When('connected uri is correct', () => {
		expect(connex.uri).toEqual(MONGODB_ADDON_URI);
	});

	And('`connex.options`', () => {
		const { options } = connex;

		When('set useNewUrlParser is true', () => {
			expect(options.useNewUrlParser).toEqual(true);
		});

		When('set dbName is correct', () => {
			expect(options.dbName).toEqual('test');
		});

		When('set promise library is Bluebird', () => {
			expect(options.promiseLibrary).toEqual(Bluebird);
		});
	});
});
