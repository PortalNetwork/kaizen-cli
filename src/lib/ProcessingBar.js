const ProgressBar = require('progress');


const green = '\u001b[42m \u001b[0m';
const red = '\u001b[41m \u001b[0m';
const total = 40;
const bar = new ProgressBar('  [:bar]', {
  complete: green,
  incomplete: red,
  total,
});


const processingBar = {
  interval: null,
};

processingBar.start = function() {
  processingBar.interval =  setInterval(function() {
    bar.tick();
    bar.curr += 1;
    if (bar.curr >= total) {
      bar.curr = 0
    }
  }, 100);
}

processingBar.stop = function() {
  console.log('\n');
  clearInterval(processingBar.interval);
}

module.exports = processingBar;
