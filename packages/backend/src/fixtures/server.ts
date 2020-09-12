import { serverConfig } from '../config';

export const testServerConfig = {
	...serverConfig,
	logger: false,
};
