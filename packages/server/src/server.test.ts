import * as R from 'ramda';
import { api } from '.';

const { PORT, MONGODB_ADDON_URI, MONGODB_ADDON_DB } = process.env;
const Server = async () => api();

describe('Givenserver cache', () => {
	let provisioned;

	beforeEach(async () => {
		const path = ['settings', 'cache', 0];
		const server = await Server();
		provisioned = R.path(path, server);
	});

	it('When mongodb-cache is provisioned the name is correct', async () => {
		expect(provisioned.name).toEqual('mongodb-cache');
	});

	it('When mongodb-cache connection is made the details are correct', () => {
		const { uri, partition } = R.path(['provider', 'options'], provisioned);

		expect(uri).toEqual(MONGODB_ADDON_URI);
		expect(partition).toEqual(MONGODB_ADDON_DB);
	});
});

describe('Givenserver info', () => {
	let server;

	beforeEach(async () => {
		server = await Server();
	});

	it('When server is set port value is correct', () => {
		expect(server.info.port).toEqual(Number(PORT));
	});

	it('When server is set host value is correct', () => {
		expect(server.info.host).toEqual('0.0.0.0');
	});
});
