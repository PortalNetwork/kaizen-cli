"use strict";

var ProgressBar = require('progress');

var green = "\x1B[42m \x1B[0m";
var red = "\x1B[41m \x1B[0m";
var total = 40;
var bar = new ProgressBar('  [:bar]', {
  complete: green,
  incomplete: red,
  total: total
});
var processingBar = {
  interval: null
};

processingBar.start = function () {
  processingBar.interval = setInterval(function () {
    bar.tick();
    bar.curr += 1;

    if (bar.curr >= total) {
      bar.curr = 0;
    }
  }, 100);
};

processingBar.stop = function () {
  console.log('\n');
  clearInterval(processingBar.interval);
};

module.exports = processingBar;