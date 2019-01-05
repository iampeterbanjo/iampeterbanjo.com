const Hapi = require('hapi');
const Path = require('path');
const Inert = require('inert');

(async () => {
  const server = Hapi.server({
    host: '0.0.0.0',
    port: Number(process.env.PORT || 8080),
    routes: {
      files: {
        relativeTo: __dirname
      }
    }
  });

  await server.register(Inert);

  server.route({
    path: '/',
    method: 'GET',
    handler: () => 'Hello world, I am Peter Banjo'
  });

  server.route({
    path: '/public/{path*}',
    method: 'GET',
    handler: {
      directory: {
        path: Path.join(__dirname, '../public'),
        listing: false,
        index: false
      }
    }
  });

  server.route({
    path: '/blog/{path*}',
    method: 'GET',
    handler: {
      directory: {
        path: Path.join(__dirname, '../blog/build'),
        listing: false,
      }
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
})();
