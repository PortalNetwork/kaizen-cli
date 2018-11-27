var HelloWorld = artifacts.require("../contracts/HelloWorld.sol");

module.exports = function(deployer) {
  deployer.deploy(HelloWorld);
};
