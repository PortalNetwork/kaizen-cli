"use strict";

module.exports = function (yargs) {
  var command = 'plugin';
  var commandDescription = 'Plugin management for kaizen';
  yargs.command(command, commandDescription);
};