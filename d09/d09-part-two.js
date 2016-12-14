var fs = require('fs');

// Load input file
//var compressed = fs.readFileSync(__dirname + '/d09_input.txt').toString().trim();
var compressed = '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN';

var length = 0, i = 0;

var instruction = /\((\d+)x(\d+)\)(.+)/g;

var decompressedLength = (text, times) => {
  console.log('decompress %s %s times', text, times)
  var sub = /\((\d+)x(\d+)\)([A-Z]*)/g.exec(text)
  if(sub){
    var nbChar = parseInt(sub[1]);
    var iteration = parseInt(sub[2]);
    var text = sub[3];
    return decompressedLength(text.substring(0,nbChar), iteration);
  }
  else{
    return text.length * times;
  }
};

while(match = instruction.exec(compressed)){
    var nbChar = parseInt(match[1]);
    var iteration = parseInt(match[2]);
    var text = match[3];
    console.log(nbChar, iteration, text);
    length += decompressedLength(text, iteration);
}

console.log('Compressed length : %s, Decompressed length : %s', compressed.length, length);
