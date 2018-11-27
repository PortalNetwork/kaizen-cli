const ExecuteCommand = require('../../lib/ExecuteCommand');

module.exports = async function () {
    await ExecuteCommand("npm uninstall @noia-network/sdk@rc");
    await ExecuteCommand("npm uninstall @noia-network/sdk-react@rc");
    await ExecuteCommand("npm uninstall @noia-network/webrtc-direct-client");
    await ExecuteCommand("npm uninstall worker-loader");
    await ExecuteCommand("npm uninstall rusha");
}