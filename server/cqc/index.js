const got = require('got');
const client = got.extend({ baseUrl: process.env.CQC_API_URL });

module.exports = {
  plugin: require('./api'),
  options: { client }
};
