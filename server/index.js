const path = require('path');

module.exports = {
  Server: require('./app'),
  rootPath: path.join(__dirname, '../blog/public/')
};
