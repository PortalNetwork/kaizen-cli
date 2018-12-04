"use strict";

module.exports = function (yargs) {
  var command = 'plugin list';
  var commandDescription = 'Lists all available plugins';
  yargs.command(command, commandDescription);
};