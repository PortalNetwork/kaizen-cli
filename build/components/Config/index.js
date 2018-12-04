"use strict";

module.exports = function (yargs) {
  var command = 'config';
  var commandDescription = 'Configure kaizen';
  yargs.command(command, commandDescription);
};