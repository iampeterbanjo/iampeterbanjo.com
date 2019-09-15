import plugin from './plugin';
import { getDbConnection } from '../models/helpers';

export default {
	plugin,
	options: { getDbConnection },
};
