var all = {};

all.count = function(runningTotal, input) {
  var fields = input.split(',');
  increment(runningTotal, 'sessionId', fields[0]);
  increment(runningTotal, 'page', fields[1]);
  increment(runningTotal, 'latency', fields[2]);
  increment(runningTotal, 'timeOnPage', fields[3]);
  return runningTotal;
};

function increment(runningTotal, field, value) {
  if (value === '') runningTotal[field + '_null']++;
  else runningTotal[field]++;
}

module.exports = all;
