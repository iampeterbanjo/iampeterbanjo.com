import Bluebird from 'bluebird';
import utils from '../utils';

const { vars } = utils;
const { MONGODB_ADDON_DB = '', MONGODB_ADDON_URI = '' } = vars;

export const connex: Connex = {} as Connex;

connex.dbName = isTest => (isTest ? 'test' : MONGODB_ADDON_DB);
connex.uri = MONGODB_ADDON_URI;
connex.options = {
	useNewUrlParser: true,
	dbName: connex.dbName(process.env.NODE_ENV === 'test'),
	promiseLibrary: Bluebird,
};
