import cors from 'fastify-cors';
import sensible from 'fastify-sensible';
import database from './database';
import migrations from './migrations';
import fastifyNext from 'fastify-nextjs';

export { database, fastifyNext, migrations, sensible, cors };
