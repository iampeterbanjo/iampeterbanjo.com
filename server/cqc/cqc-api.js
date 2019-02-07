module.exports = {
  name: 'cqc-api',
  version: '0.0.1',
  register: cqcApi
};

const got = require('got');

function cqcApi(server, options) {
  server.route({
    path: '/cqc/providers',
    method: 'GET',
    handler: async (request, reply) => {
      try {
        const response = await got(`${process.env.CQC_API_URL}/providers`);
        return response.body;
      } catch (error) {
        console.warn(error);
      }
    }
  });
}
