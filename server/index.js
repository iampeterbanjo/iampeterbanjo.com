const Hapi = require("hapi");
const Inert = require("inert");

const path = require("path");
const cssPath = path.join(__dirname, "../public/build/assets/styles/");
const imagePath = path.join(__dirname, "../public/build/assets/images/");
const staticPath = path.join(__dirname, "../public/build/static/");
const blogPath = path.join(__dirname, "../public/build/static/blog/");

(async () => {
  const server = Hapi.server({
    host: "0.0.0.0",
    port: Number(process.env.PORT || 8080),
    routes: {
      files: {
        relativeTo: __dirname
      }
    }
  });

  try {
    await server.register(Inert);
    await server.register({
      plugin: require("./statics"),
      options: { blogPath, cssPath, staticPath, imagePath }
    });
    await server.register({
      plugin: require("./cqc")
    });
    await server.register({
      plugin: require("./hapi-require-https")
    });
    await server.start();

    console.log(`Server running at: ${server.info.uri}`);
  } catch (error) {
    console.warn(error);
  }
})();
