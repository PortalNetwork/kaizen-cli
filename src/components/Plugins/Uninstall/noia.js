const path = require("path");
const fsx = require("fs-extra");
const ExecuteCommand = require("../../../lib/ExecuteCommand");

module.exports = async function () {
  await ExecuteCommand("npm uninstall @noia-network/sdk@rc");
  await ExecuteCommand("npm uninstall @noia-network/sdk-react@rc");
  await ExecuteCommand("npm uninstall @noia-network/webrtc-direct-client");
  await ExecuteCommand("npm uninstall worker-loader");
  await ExecuteCommand("npm uninstall rusha");

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
