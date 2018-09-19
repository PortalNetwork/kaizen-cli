module.exports = function(ws, uuid) {
  var PNBluzelle = require('bluzelle');
  PNBluzelle.connect(ws, uuid);

  return ({
    create: function(key, value) {
      PNBluzelle.create(key, value);
    },
    read: function(key, cb) {
      PNBluzelle.read(key).then(cb);
    },
    update: function(key, value) {
      PNBluzelle.update(key, value);
    },
    delete: function(key) {
      PNBluzelle.remove(key);
    },
  });
}