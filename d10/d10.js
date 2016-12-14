var fs = require('fs');

// Load input file
var input = fs.readFileSync(__dirname + '/d10_input.txt').toString().trim().split('\n');

var bots = [];
var output = [];

var highToFind = 61, lowToFind = 17;
var currentBot = -1;

input.forEach(instruction => {
  var splitted = instruction.split(' ');
  var botNumber = -1;
  var bot = { i1: -1, i2: -1, lowTo: -1, highTo: -1, lowToOutput: false , highToOutput: false };

  if(splitted[0] == 'value'){
    var microship = parseInt(splitted[1]);
    botNumber = parseInt(splitted[5]);
    if(bots[botNumber]) bot = bots[botNumber];
    if(bot.i1 > 0) {
      bot.i2 = microship;
      currentBot = botNumber;
    } else {
      bot.i1 = microship;
    }
  }
  else{
    var low = parseInt(splitted[6]);
    var high = parseInt(splitted[11]);
    var lowIsOutput = splitted[5] == 'output';
    var highIsOutput = splitted[10] == 'output';
    botNumber = parseInt(splitted[1]);
    if(bots[botNumber]) bot = bots[botNumber];
    bot.lowTo = low;
    bot.highTo = high;
    bot.lowToOutput = lowIsOutput;
    bot.highToOutput = highIsOutput;
    if(lowIsOutput) output[low] = [];
    if(highIsOutput) output[high] = [];
  }
  bots[botNumber] = bot;
});

var foundIndex = -1;
var allCrawled = false;

while(!allCrawled){
  var ok = false;
  bots.forEach((bot, index) => {
    if(bot.i1 > 0 && bot.i2 > 0){
      if(bot.i1 == highToFind && bot.i2 == lowToFind) foundIndex = index;
      var low, high;
      if(bot.i1 > bot.i2) {low = bot.i2; high = bot.i1;} else {low = bot.i1; high = bot.i2;}
      if(bot.lowToOutput) output[bot.lowTo].push(low);
      else if(bots[bot.lowTo].i1 > 0) bots[bot.lowTo].i2 = low; else bots[bot.lowTo].i1 = low;
      if(bot.highToOutput) output[bot.highTo].push(high);
      else if(bots[bot.highTo].i1 > 0) bots[bot.highTo].i2 = high; else bots[bot.highTo].i1 = high;
      ok = true;
      bot.i1 = -1; bot.i2 = -1;
    }
  });
  if(!ok) allCrawled = true;
}
console.log('Found bot %s, comparing value %s to %s', foundIndex, highToFind, lowToFind);
console.log(output[0][0] * output[1][0] * output[2][0]);
