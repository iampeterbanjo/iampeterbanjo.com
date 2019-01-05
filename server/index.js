const Hapi = require('hapi');
const path = require('path');
const Inert = require('inert');
const cssPath = path.join(__dirname, '../public/build/assets/styles/');
const staticPath = path.join(__dirname, '../public/build/static/');
const blogPath = path.join(__dirname, '../public/build/static/blog/');

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
    path: '/{path*}',
    method: 'GET',
    handler: {
      directory: {
        path: staticPath,
        listing: false,
        index: true
      }
    }
  });

  server.route({
    path: '/css/{path*}',
    method: 'GET',
    handler: {
      directory: {
        path: cssPath,
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
        path: blogPath,
        listing: false,
        index: true,
      }
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
})();
