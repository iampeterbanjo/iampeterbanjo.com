module.exports = {
  name: 'cqc-api',
  version: '0.0.1',
  register: cqcApi
};

const got = require('got');

function cqcApi(server, options) {
  server.route({
    path: '/providers',
    method: 'GET',
    handler: async (request, reply) => {
      const url = `https://api.cqc.org.uk/public/v1/providers`;
      await got(url);
      return 'Hello';
    }
  });
}
