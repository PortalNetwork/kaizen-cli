const cmd = require('node-cmd');
const fsx = require('fs-extra');

module.exports = async function (name, library) {
  const projectName = name || 'new-boilerplate';

  switch (library) {
    case 'vue':
      await cloneProjectFromGithub('https://github.com/PortalNetwork/vue-truffle.git', projectName);
      fsx.removeSync(`./${projectName}/.git`);
      break;
    case 'react':
      await cloneProjectFromGithub('https://github.com/PortalNetwork/react-truffle.git', projectName);
      fsx.removeSync(`./${projectName}/.git`);
      break;
    default:
      await cloneProjectFromGithub('https://github.com/PortalNetwork/kaizen-boilerplate.git', projectName);
      fsx.removeSync(`./${projectName}/.git`);
      break;
  }
}

function cloneProjectFromGithub(repoURL, projectName) {
  return new Promise(function (resolve, reject) {
    cmd.get(`git clone ${repoURL} ${projectName}`, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}
