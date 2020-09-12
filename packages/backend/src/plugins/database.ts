// @ts-ignore
import { MONGODB_ADDON_DB, MONGODB_ADDON_URI } from '@iampeterbanjo/env';
import { MigrationModel } from '@iampeterbanjo/models';
import { DbConnector, fastifyPlugin } from '@iampeterbanjo/types';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { IBackendDatabase } from '../backend';

type Opts = {
	getDbConnection: DbConnector;
};

export const Database = {
	init: async (getDbConnection: DbConnector): Promise<IBackendDatabase> => {
		const { connection } = await getDbConnection({
			uri: MONGODB_ADDON_URI,
			name: MONGODB_ADDON_DB,
		});

		return {
			connection,
			MigrationModel,
		};
	},
};

const db: fastifyPlugin<FastifyInstance> = async (
	fastify,
	options: Opts,
	next,
) => {
	const connex = await Database.init(options.getDbConnection);

	fastify.decorate('mongodb', connex.connection.db);
	fastify.decorate('models', {
		Migration: connex.MigrationModel,
	});

	next();
};

export default fp(db);
