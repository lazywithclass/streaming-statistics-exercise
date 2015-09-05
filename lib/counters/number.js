var number = {};

number.min = comparison(lt);
number.max = comparison(gt);

number.average = function(runningAverage, input) {
  var fields = input.split(',');

  runningAverage.latency.count++;
  runningAverage.latency.sum += parseFloat(fields[2], 10) || 0;
  runningAverage.latency.average = runningAverage.latency.sum /
    runningAverage.latency.count;

  runningAverage.timeOnPage.count++;
  runningAverage.timeOnPage.sum += parseFloat(fields[3], 10) || 0;
  runningAverage.timeOnPage.average = runningAverage.timeOnPage.sum /
    runningAverage.timeOnPage.count;

  return runningAverage;
};

function comparison(op) {
  return function(runningTotal, input) {
    var fields = input.split(',');
    compare(runningTotal, 'latency', fields[2], op);
    compare(runningTotal, 'timeOnPage', fields[3], op);
    return runningTotal;
  };
}

function compare(runningTotal, field, value, op) {
  // NaN comparisons always return false
  value = parseFloat(value, 10);
  if (runningTotal[field] === -1 ||
      op(value, runningTotal[field])) runningTotal[field] = value;
}

function lt(a, b) { return a < b; }
function gt(a, b) { return a > b; }

module.exports = number;
