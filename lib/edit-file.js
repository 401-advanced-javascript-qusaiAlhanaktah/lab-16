

const fs = require('fs');
const util = require('util');
const readingFile = util.promisify(fs.readFile);
const readerFile = (file, cb) => {
  return readingFile(file)
    .then((data) => {
      return data;
    })
    .catch(error => error);
};

const writeFunc = util.promisify(fs.writeFile);
const editFile = (file, data) => {
  return writeFunc(file, data);
};

module.exports = { readerFile, editFile };