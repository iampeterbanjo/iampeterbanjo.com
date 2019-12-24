import Bluebird from 'bluebird';
import env from '@iampeterbanjo/env';

import * as helpers from '../../src/models/helpers';

const { connectionOptions } = helpers;
const { MONGODB_ADDON_DB } = env;

describe('Given model connectionOptions', () => {
	test('When connected dbName is correct', () => {
		expect(connectionOptions.dbName).toEqual(MONGODB_ADDON_DB);
	});

	test('When set useNewUrlParser is true', () => {
		expect(connectionOptions.useNewUrlParser).toEqual(true);
	});

	test('When set promise library is Bluebird', () => {
		expect(connectionOptions.promiseLibrary).toEqual(Bluebird);
	});
});
