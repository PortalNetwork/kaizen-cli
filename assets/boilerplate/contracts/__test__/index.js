const fs = require('fs');
const { execSync, } = require('child_process');
const KillPort = require('kill-port');

try {
  const files = fs.readdirSync(__dirname).filter(x => x !== 'index.js');
  files.forEach((file) => {
    const filePath = `${__dirname}/${file}`;
    const result = execSync(`./node_modules/.bin/truffle test ${filePath}`);
    console.log(result.toString('utf8'));
  });
  KillPort(8545); // default ganache-cli port, 
} catch (error) {
  console.log(error.stdout.toString('utf8'));
  KillPort(8545); // default ganache-cli port, 
}