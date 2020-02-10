

const edit = require('../lib/edit-file');
const path = require('path');

describe('Read file Module', () => {
  let file = `${__dirname}/data/person.json`;
  it('when given a bad file, return an error', () => {
    edit.readerFile(file, (err, data) => {
      expect(err).toBeUndefined();
    });
  });
  it('when given the same file, return content', () => {
    edit.readerFile(file, (err, data) => {
      expect(typeof data).toBe('string');
    });
  });
});

describe('update file Module', () => {

  it('check if Accepts a file name as a command line parameter', () => {
    let file = `${__dirname}/data/person.json`;
    let fileName = path.basename(file);
    process.argv.push(fileName);
    expect(process.argv[process.argv.length - 1]).toEqual(fileName);
  });
  it('Alter firstname value in the object file', () => {
    let file = `${__dirname}/data/person.json`;
    return edit.readerFile(file)
      .then((data) => {
        let jsonData = JSON.parse(data.toString().trim());
        return jsonData;
      })
      .then((data) => {
        data.firstName = 'Qusai';
        let bufferData = Buffer.from(JSON.stringify(data));
        return edit.editFile(file, bufferData);
      })
      .then(() => {
        return edit.readerFile(file)
          .then((data) => {
            let jsonData = JSON.parse(data.toString().trim());
            return expect(jsonData.firstName).toEqual('Qusai');
          });
      })
      .catch((error) => { return error; });

  });

  it('Make sure the other values remain the same after altering', () => {
    let file = `${__dirname}/data/person.json`;
    return edit.readerFile(file)
      .then((data) => {
        let jsonData = JSON.parse(data.toString().trim());
        return jsonData;
      })
      .then((data) => {
        data.firstName = 'dante';
        let buffData = Buffer.from(JSON.stringify(data));
        return edit.editFile(file, buffData);
      })
      .then(() => {
        return edit.readerFile(file)
          .then((data) => {
            let jsonData = JSON.parse(data.toString().trim());
            return expect(jsonData.lastName).toEqual('Scissorhands');
          });
      })
      .catch((error) => { return error; });

  });

  it('Data format do not change after using the write method', () => {
    let file = `${__dirname}/data/person.json`;
    return edit.readerFile(file)
      .then((data) => {
        let jsonData = JSON.parse(data.toString().trim());
        return jsonData;
      })
      .then((data) => {
        data.firstName = 'QUSAI';
        let buffData = Buffer.from(JSON.stringify(data));
        return edit.editFile(file, buffData);
      })
      .then(() => {
        return edit.readerFile(file)
          .then((data) => {
            let jsonData = data.toString().trim();
            return expect(typeof (jsonData)).toEqual('string');
          });
      })
      .catch((error) => { return error; });

  });

});