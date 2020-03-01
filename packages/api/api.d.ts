import 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { Db } from 'mongodb';
import { Model } from 'mongoose';
// import { IAddress, IDatabase, IUser } from '@iampeterbanjo/portfolio-types';
// import { UserModel, AddressModel } from '@iampeterbanjo/portfolio-models';

declare module 'fastify' {
	export interface FastifyInstance<
		HttpServer = Server,
		HttpRequest = IncomingMessage,
		HttpResponse = ServerResponse
	> {}
}
