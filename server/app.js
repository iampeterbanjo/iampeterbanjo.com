const Hapi = require('hapi');
const Inert = require('inert');
const { rootPath } = require('.');

module.exports = async callback => {
  const server = Hapi.server({
    host: '0.0.0.0',
    port: Number(process.env.PORT || 8080),
    routes: {
      files: {
        relativeTo: __dirname
      }
    }
  });

  try {
    // good needs to be first
    // https://github.com/hapijs/oppsy/issues/17#issuecomment-430633689
    await server.register({
      plugin: require('good'),
      options: {
        reporters: {
          myConsoleReporter: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*' }]
            },
            {
              module: 'good-console'
            },
            'stdout'
          ]
        }
      }
    });
    await server.register(Inert);
    await server.register({
      plugin: require('./statics'),
      options: { rootPath }
    });
    await server.register({
      plugin: require('./cqc')
    });
    await server.register({
      plugin: require('./https-here')
    });

    callback(null, server);
  } catch (error) {
    console.warn(error);
    callback(error, server);
  }
};
