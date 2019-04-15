const got = require('got');

const clientel = got.extend({ baseUrl: 'http://0.0.0.0:8080', json: true });

module.exports = clientel;
