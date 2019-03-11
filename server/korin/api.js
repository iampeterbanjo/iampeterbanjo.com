module.exports = {
  name: 'korin-api',
  version: '0.0.1',
  register: (server, { client }) => {
    server.route({
      path: '/korin',
      method: 'GET',
      handler: async (request, reply) => (await client.get(`/providers`)).body
    });
  }
};
