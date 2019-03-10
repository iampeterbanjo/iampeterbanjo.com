module.exports = {
  name: 'cqc-api',
  version: '0.0.1',
  register: cqcApi
};

function cqcApi(server, { client }) {
  server.route({
    path: '/cqc/providers',
    method: 'GET',
    handler: async (request, reply) => {
      try {
        const response = await client.get(`/providers`);
        return response.body;
      } catch (error) {
        throw error;
      }
    }
  });
}
