import Bluebird from 'bluebird';

import utils from '../../src/utils';
import * as helpers from '../../src/models/helpers';

const { vars } = utils;
const { connectionOptions } = helpers;
const { MONGODB_ADDON_URI, MONGODB_ADDON_DB } = vars;

describe('Given model connectionOptions', () => {
	it('When connected dbName is correct', () => {
		expect(connectionOptions.dbName).toEqual(MONGODB_ADDON_DB);
	});

	it('When set useNewUrlParser is true', () => {
		expect(connectionOptions.useNewUrlParser).toEqual(true);
	});

	it('When set promise library is Bluebird', () => {
		expect(connectionOptions.promiseLibrary).toEqual(Bluebird);
	});
});
