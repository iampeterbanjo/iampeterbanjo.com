// based on https://github.com/bendrucker/hapi-require-https/blob/master/index.js
module.exports = {
  name: 'hapi-require-https',
  version: '0.0.1',
  register: (server, options) => {
    server.ext('onRequest', (request, h) => {
      if (process.env.NODE_ENV !== 'production') {
        return h.continue
      }

      const redirect = options.proxy !== false
      ? request.headers['x-forwarded-proto'] === 'http'
        : request.server.info.protocol === 'http'
      const host = request.headers['x-forwarded-host'] || request.headers.host

      if (!redirect) {
        return h.continue
      }

      return h
        .redirect('https://' + host + request.url.path)
        .takeover()
        .code(301)
    })
  }
}
