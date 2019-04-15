const got = require('got');
const { baseUrl } = require('./vars');

const clientel = got.extend({ baseUrl, json: true });

module.exports = clientel;
