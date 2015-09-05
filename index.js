var printer = require('./lib/printer');

var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
  // TODO avoid doing an if here as it will be needed fopr the
  // first line only but it will be evaluated every other 999999 times
  if (line[0] === '"') return;
  printer.print(line);
});

rl.on('close', function() {});
