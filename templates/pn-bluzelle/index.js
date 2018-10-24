const config = require('../../kaizen.json');
const bluzelle = require('bluzelle');

if(!config || !config.bluzelle || !config.bluzelle.ws || !config.bluzelle.uuid) {
  throw 'can not configure kaizen.json on the root of project';
}

bluzelle.connect(config.bluzelle.ws, config.bluzelle.uuid);
module.exports = bluzelle;
