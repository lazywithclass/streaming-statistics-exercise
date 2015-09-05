var text = {};

text.shortest = function(runningTotal, input) {
  var fields = input.split(','),
      sessionId = fields[0],
      page = fields[1];
  if (sessionId != '' && sessionId.length < runningTotal.sessionId)
    runningTotal.sessionId = sessionId.length;
  if (page != '' && page.length < runningTotal.page)
    runningTotal.page = page.length;
  return runningTotal;
};

text.longest = function(runningTotal, input) {
  var fields = input.split(','),
      sessionId = fields[0],
      page = fields[1];
  if (sessionId.length > runningTotal.sessionId)
    runningTotal.sessionId = sessionId.length;
  if (page.length > runningTotal.page)
    runningTotal.page = page.length;
  return runningTotal;
};

text.average = function(runningAverage, input) {
  var fields = input.split(',');

  runningAverage.sessionId.count++;
  runningAverage.sessionId.sum += parseFloat(fields[2], 10) || 0;
  runningAverage.sessionId.average = runningAverage.sessionId.sum /
    runningAverage.sessionId.count;

  runningAverage.page.count++;
  runningAverage.page.sum += parseFloat(fields[3], 10) || 0;
  runningAverage.page.average = runningAverage.page.sum /
    runningAverage.page.count;

  return runningAverage;
};


module.exports = text;
