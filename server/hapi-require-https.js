// based on https://github.com/bendrucker/hapi-require-https

module.exports = { register, name: "hapi-require-https" };

function register(server, options) {
  server.ext("onRequest", function(request, h) {
    const redirect =
      options.proxy !== false
        ? request.headers["x-forwarded-proto"] === "http"
        : request.server.info.protocol === "http";
    const host = request.headers["x-forwarded-host"] || request.headers.host;

    if (!redirect) return h.continue;
    const { path = "" } = request.url;

    return h
      .redirect(`https://${host}${path}`)
      .takeover()
      .code(301);
  });
}
