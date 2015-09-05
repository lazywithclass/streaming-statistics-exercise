var text = {},
    number = require('./number');

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
  number.averageField(runningAverage, 'sessionId', fields[0].length);
  number.averageField(runningAverage, 'page', fields[1].length);
  return runningAverage;
};

module.exports = text;
