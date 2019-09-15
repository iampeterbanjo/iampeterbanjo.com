import Agenda from 'agenda';
import utils from '../utils';

const {
	vars: { MONGODB_ADDON_URI },
} = utils;
const agenda = new Agenda(MONGODB_ADDON_URI);

export default {
	name: 'agenda',
	version: '1.0.0',
	register: server => {
		server.app.agenda = agenda;
	},
};
