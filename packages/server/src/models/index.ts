import plugin from './plugin';
import { getDbConnection } from './helpers';

export default {
	plugin,
	options: { getDbConnection },
};
