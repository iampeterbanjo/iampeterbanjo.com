import cors from 'fastify-cors';
import sensible from 'fastify-sensible';
import database from './database';
import migrations from './migrations';
import nextSsr from './nextjs';

export { database, migrations, sensible, cors, nextSsr };
