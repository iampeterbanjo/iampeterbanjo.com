module.exports = {
  name: 'cqc-api',
  version: '0.0.1',
  register: cqcApi
};

function cqcApi(server, options) {
  const { CQC_API_URL } = process.env;
  server.route({
    path: '/cqc',
    method: 'GET',
    handler: (request, reply) => {
      return 'Hello, CQC';
    }
  });
};
