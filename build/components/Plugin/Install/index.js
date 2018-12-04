"use strict";

module.exports = function (yargs) {
  var command = 'plugin install';
  var commandDescription = 'Install and add a plugin to your project';
  yargs.command(command, commandDescription);
};