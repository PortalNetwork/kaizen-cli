const cmd = require('node-cmd');

module.exports = function(command) {
  return new Promise(function(resolve, reject) {
    cmd.get(command, function (error, data) {
      if(error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}