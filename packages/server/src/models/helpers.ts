const Bluebird = require('bluebird');
const { vars } = require('../utils');

const { MONGODB_ADDON_DB, MONGODB_ADDON_URI } = vars;

const connex = {};
/**
 * Get database name
 * @param {boolean} [isTest]
 * @return {string} database name
 */
connex.dbName = isTest => (isTest ? 'test' : MONGODB_ADDON_DB);
connex.uri = MONGODB_ADDON_URI;
connex.options = {
	useNewUrlParser: true,
	dbName: connex.dbName(process.env.NODE_ENV === 'test'),
	promiseLibrary: Bluebird,
};

export default  {
	connex,
};
