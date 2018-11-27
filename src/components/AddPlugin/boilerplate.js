const cmd = require('node-cmd');
const path = require('path');
const fsx = require('fs-extra');

module.exports = async function (name, library) {
  const projectName = name || 'new-boilerplate';
  const sourcePath = path.resolve(__dirname, '../../../assets/boilerplate');
  const targetPath = path.resolve('./', projectName);

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
      fsx.copySync(sourcePath, targetPath);
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
