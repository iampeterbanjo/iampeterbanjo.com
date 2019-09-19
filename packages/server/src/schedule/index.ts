import plugin from './plugin';
import { getDbConnection } from '../models/helpers';
import Agenda from 'agenda';

export default {
	plugin,
	options: { getDbConnection, Agenda },
};
