import { ServerOptions } from 'fastify';
import hyperid from 'hyperid';

export const generateUniqueId = hyperid({ urlSafe: true });

export const serverConfig: ServerOptions = {
	logger: true,
	ignoreTrailingSlash: true,
	genReqId: () => generateUniqueId(),
};
