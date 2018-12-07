const path = require("path");
const fsx = require("fs-extra");
const ExecuteCommand = require("../../lib/ExecuteCommand");

module.exports = async function () {
  await ExecuteCommand("npm install @noia-network/sdk@rc");
  await ExecuteCommand("npm install @noia-network/sdk-react@rc");
  await ExecuteCommand("npm install @noia-network/webrtc-direct-client");
  await ExecuteCommand("npm install worker-loader");
  await ExecuteCommand("npm install rusha");

  // update user's kaizen config
  const userConfig = fsx.readJsonSync(path.resolve("./", "kaizen.json"));

  if (!userConfig.plugins) {
    userConfig.plugins = [];
  }

  if (userConfig.plugins.includes("noia") === false) {
    userConfig.plugins.push("noia");
  }

  fsx.outputJsonSync(path.resolve("./", "kaizen.json"), userConfig);
};
