var number = {};

number.min = comparison(lt);
number.max = comparison(gt);

number.averageField = function(runningAverage, field, value) {
  runningAverage[field].count++;
  runningAverage[field].sum += value || 0;
  runningAverage[field].average = runningAverage[field].sum /
    runningAverage[field].count;
  return runningAverage;
};


number.average = function(runningAverage, input) {
  var fields = input.split(',');
  number.averageField(runningAverage, 'latency', parseFloat(fields[2], 10));
  number.averageField(runningAverage, 'timeOnPage', parseFloat(fields[3], 10));
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
