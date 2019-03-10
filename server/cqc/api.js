module.exports = {
  name: 'cqc-api',
  version: '0.2.0',
  register: (server, { client }) => {
    server.route({
      path: '/cqc/providers',
      method: 'GET',
      handler: async (request, reply) => (await client.get(`/providers`)).body
    });
  }
};
