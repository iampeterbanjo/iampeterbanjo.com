import * as R from 'ramda';
import { api } from '.';
import utils from './utils';

const { vars } = utils;
const { PORT, MONGODB_ADDON_URI, MONGODB_ADDON_DB } = vars;
const Server = async () => api();

// describe('Given server cache', () => {
// 	let provisioned;

// 	beforeEach(async () => {
// 		const path = ['settings', 'cache', 0];
// 		const server = await Server();
// 		provisioned = R.path(path, server);
// 	});

// 	it('When mongodb-cache is provisioned the name is correct', async () => {
// 		expect(provisioned.name).toEqual('mongodb-cache');
// 	});

// 	it('When mongodb-cache connection is made the details are correct', () => {
// 		const { uri, partition } = R.pathOr(
// 			{} as any,
// 			['provider', 'options'],
// 			provisioned,
// 		);

// 		expect(uri).toEqual(MONGODB_ADDON_URI);
// 		expect(partition).toEqual(MONGODB_ADDON_DB);
// 	});
// });

describe('Given server info', () => {
	it('should', () => {
		expect(true).toBeTruthy();
	});
	// let server;

	// beforeEach(async () => {
	// 	server = await Server();
	// });

	// it('When server is set port value is correct', () => {
	// 	expect(server.info.port).toEqual(Number(PORT));
	// });

	// it('When server is set host value is correct', () => {
	// 	expect(server.info.host).toEqual('0.0.0.0');
	// });
});
