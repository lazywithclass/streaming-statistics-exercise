var printer = {},
    util = require('util'),
    all = require('./counters/all'),
    number = require('./counters/number'),
    text = require('./counters/text');

printer.print = function(input) {
  var allRunningTotal = {
    sessionId: 0, sessionId_null: 0,
    page: 0, page_null: 0,
    latency: 0, latency_null: 0,
    timeOnPage: 0, timeOnPage_null: 0
  };
  var numberRunningMin = { latency: -1, timeOnPage: -1 };
  var numberRunningMax = { latency: 0, timeOnPage: 0 };
  var numberRunningAverage = {
    latency: {
      count: 0, sum: 0, average: 0
    },
    timeOnPage: {
      count: 0, sum: 0, average: 0
    }
  };
  var textRunningShortest = { sessionId: -1, page: -1 };
  var textRunningLongest = { sessionId: 0, page: 0 };
  var textRunningAverage = {
    sessionId: {
      count: 0, sum: 0, average: 0
    },
    page: {
      count: 0, sum: 0, average: 0
    }
  };

  var allResult = all.count(allRunningTotal, input),
      allOutputTemplate= 'field(count-not-null count-null) sessionId(%d %d) page(%d %d) latency(%d %d) timeOnPage(%d %d)';
  var allOutput = util.format(
    allOutputTemplate,
    allResult.sessionId, allResult.sessionId_null,
    allResult.page, allResult.page_null,
    allResult.latency, allResult.latency_null,
    allResult.timeOnPage, allResult.timeOnPage_null
  );

  var fieldTemplate = 'field(min max avg) sessionId(%d %d %d) page(%d %d %d) latency(%d %d %d) timeOnPage(%d %d %d)',
      min = number.min(numberRunningMin, input),
      max = number.max(numberRunningMax, input),
      numberAverage = number.average(numberRunningAverage, input),
      shortest = text.shortest(textRunningShortest, input),
      longest = text.longest(textRunningLongest, input),
      textAverage = text.average(textRunningAverage, input);
  var fieldOutput = util.format(
    fieldTemplate,
    shortest.sessionId, longest.sessionId, textAverage.sessionId.average,
    shortest.page, longest.page, textAverage.page.average,
    d(min.latency), max.latency, numberAverage.latency.average,
    d(min.timeOnPage), max.timeOnPage, numberAverage.timeOnPage.average
  );

  console.log(allOutput);
  console.log(fieldOutput);
};

// default values to print on screen
function d(value) {
  return value === -1 ? 0 : value;
}

module.exports = printer;
