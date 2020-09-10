import { FastifyError } from 'fastify';

export type Next = (err?: FastifyError | undefined) => void;

export type fastifyPlugin<T> = (
	fastify: T,
	options: any,
	next: Next,
) => Promise<void>;
