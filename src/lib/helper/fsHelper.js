const fs = require('fs');
const fse = require('fs-extra');

function existsSync(path) {
  return fs.existsSync(path);
}

function readFileSync(path) {
  return fs.readFileSync(path);
}

function readJSONSync(path) {
  return JSON.parse(readFileSync(path));
}

function updateFileSync(path, content) {
  fs.writeFileSync(path, content);
}

function removeSync(path) {
  fse.remove(path);
}


exports.existsSync = existsSync;
exports.readFileSync = readFileSync;
exports.readJSONSync = readJSONSync;
exports.updateFileSync = updateFileSync;
exports.removeSync = removeSync;
