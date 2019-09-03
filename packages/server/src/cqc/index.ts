import Wreck from '@hapi/wreck';
import plugin from './plugin';

const client = Wreck.defaults({ baseUrl: process.env.CQC_API_URL });

export default {
	plugin,
	options: { client },
};
