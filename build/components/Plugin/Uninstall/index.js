"use strict";

module.exports = function (yargs) {
  var command = 'plugin uninstall';
  var commandDescription = 'Uninstall and remove a plugin to your project';
  yargs.command(command, commandDescription);
};