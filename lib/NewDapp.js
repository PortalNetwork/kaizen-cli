const cmd = require('node-cmd');
const fs = require("fs");
const del = require('del');
const Log = require('../lib/Log');

module.exports = (argv) => {
  let f2eFramework = '';
  let rename = '';
  switch (argv.boilerplate) {
    case 'vue':
      f2eFramework = 'https://github.com/PortalNetwork/vue-truffle.git';
      rename = 'vue-truffle';
      break;

    case 'react':
      f2eFramework = 'https://github.com/PortalNetwork/react-truffle-metamask.git';
      rename = 'react-truffle-metamask';
      break;
  }

  cmd.get(`git clone ${f2eFramework}`, clone);
  function clone(err) {
    Log.SuccessLog('==== Clone from remote source ====');
    if (err) return Log.ErrorLog('[ERROR] git clone!');
    fs.rename(rename, `${argv.boilerplate}-${argv.name}`, fsRename);
  }

  function fsRename(err) {
    if (err == 'null') return Log.ErrorLog('[ERROR] create project!');
    del([`./${argv.boilerplate}-${argv.name}/.git`]).then(unlink);
    Log.SuccessLog(`==== Create project ${argv.boilerplate}-${argv.name} ====`);
  }

  function unlink(err) {
    if (err == 'null') return Log.ErrorLog('[ERROR] unlink file!');
  }
}