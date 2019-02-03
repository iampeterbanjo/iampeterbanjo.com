module.exports = {
  name: 'https-redirect',
  version: '0.0.1',
  register: (server) => {
    server.ext('onRequest', (request, reply) => {
      if (process.env.NODE_ENV === 'production' && request.url.protocol === 'http:') {
        const secureUrl = `https://${request.info.host}${request.path}`;
        return reply.redirect(secureUrl).takeover();
      }
      return reply.continue;
    })
  }
}
