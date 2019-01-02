const Hapi = require('hapi');

(async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: Number(process.env.PORT || 8080),
    routes: {
      files: {
        relativeTo: __dirname
      }
    }
  });

  server.route({
    path: '/',
    method: 'GET',
    handler: () => 'Hello world, I am Peter Banjo'
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
})();
