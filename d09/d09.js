var fs = require('fs');

// Load input file
var compressed = fs.readFileSync(__dirname + '/d09_input.txt').toString().trim();

var decompressed = '', i = 0;

var instruction = /\((\d+)x(\d+)\)([A-Z]*)/g, match;
var toSkip = 0;
while(match = instruction.exec(compressed)){
    var nbChar = parseInt(match[1]);
    var iteration = parseInt(match[2]);
    var text = match[3];
    if(toSkip == 0){
      if(nbChar == text.length){
        var toAppend = text.substring(0,nbChar).repeat(iteration);
        decompressed = decompressed.concat(toAppend);
        console.log(nbChar, iteration, text, text.length, toAppend);
      }
      else{
          var start = match.index + match[0].length;
          var toAppend = match.input.substring(start,start + nbChar).repeat(iteration);
          console.log("Skipping %s characters and repeat %s them %s times", nbChar, toAppend, iteration);
          decompressed = decompressed.concat(toAppend);
          toSkip = nbChar;
      }
    }
    else{
        toSkip -= match[0].length;
    }
}

console.log('Compressed length : %s, Decompressed length : %s', compressed.length, decompressed.length);
