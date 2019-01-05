'use strict';

const ejsLint = require('ejs-lint');
const fse = require('fs-extra');
const path = require('path');
const fs = require('fs');
const util = require('util');
const lstat = util.promisify(fs.lstat);

(async () => {
  const getFiles = async (directory) => await fse.readdir(directory);

  const lintEjsFile = (ejsFile) => {
    if (ejsFile.match(/.ejs$/)) {
      ejsLint(ejsFile);
      console.log(`${ejsFile}: lint passed`);
    }
  }

  const lintDirectory = async (fileOrFolder) => {
    try {
      const d = await lstat(fileOrFolder);
      if (!d.isDirectory()) {
        lintEjsFile(fileOrFolder);
        return;
      }

      const files = await getFiles(fileOrFolder);

      for (let file of files) {
        const filepath = path.join(fileOrFolder, file);
        const f = await lstat(filepath);
        if (f.isDirectory()) {
          await lintDirectory(filepath);
          continue;
        }
        lintEjsFile(file);
      }
    } catch(error) {
      console.warn(error);
      process.exit(1);
    }
  }
  lintDirectory(path.join(__dirname, './static'));
})();
