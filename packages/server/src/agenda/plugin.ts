import Agenda from 'agenda';
import utils from '../utils';

const {
	vars: { MONGODB_ADDON_URI },
} = utils;
const agenda = new Agenda(MONGODB_ADDON_URI);

export default {
	name: 'agenda',
	version: '1.0.0',
	dependencies: {
		models: '1.x.x',
		korin: '1.x.x',
	},
	register: server => {
		agenda.define('');

		server.app.agenda = agenda;
	},
};
