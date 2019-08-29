// import Lab from '@hapi/lab';
// import { expect } from '@hapi/code';
// import Bluebird from 'bluebird';
// import utils from '../../utils';
// import helpers from '../../models/helpers';

// export const lab = Lab.script();

// const { vars } = utils;
// const { connex } = helpers;
// const { test, suite } = lab;
// const { MONGODB_ADDON_URI, MONGODB_ADDON_DB } = vars;

// Given('Given model `connex` helper', () => {
// 	And(' `isTest` is true', () => {
// 		When('dbName is correct', () => {
// 			expect(connex.dbName(true)).toEqual('test');
// 		});
// 	});

// 	And(' `isTest` is false', () => {
// 		When('dbName is correct', () => {
// 			expect(connex.dbName()).toEqual(MONGODB_ADDON_DB);
// 		});
// 	});

// 	When('uri is correct', () => {
// 		expect(connex.uri).toEqual(MONGODB_ADDON_URI);
// 	});

// 	And(' `connex.options`', () => {
// 		const { options } = connex;

// 		When('useNewUrlParser is true', () => {
// 			expect(options.useNewUrlParser).toEqual(true);
// 		});

// 		When('dbName is correct', () => {
// 			expect(options.dbName).toEqual('test');
// 		});

// 		When('promise library is Bluebird', () => {
// 			expect(options.promiseLibrary).toEqual(Bluebird);
// 		});
// 	});
// });
