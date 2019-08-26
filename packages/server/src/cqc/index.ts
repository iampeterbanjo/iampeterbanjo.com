import Wreck from '@hapi/wreck';
import * as plugin from './api';

const client = Wreck.defaults({ baseUrl: process.env.CQC_API_URL });

export default {
	plugin,
	options: { client },
};
