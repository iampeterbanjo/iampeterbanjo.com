module.exports = {
  name: 'serve-static-files',
  version: '0.0.1',
  register: (server, { blogPath, cssPath, staticPath, imagePath }) => {
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
      path: '/images/{path*}',
      method: 'GET',
      handler: {
        directory: {
          path: imagePath,
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
          index: true
        }
      }
    });
  }
};
