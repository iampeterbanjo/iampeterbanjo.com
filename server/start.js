const Server = require('./app');

Server(async (err, server) => {
  if (err) {
    throw err;
  }

  try {
    await server.start();

    console.log(`Server running at: ${server.info.uri}`);
  } catch (error) {
    console.warn(error);
    throw error;
  }
});
