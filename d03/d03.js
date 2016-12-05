var fs = require('fs');

// Load input file
var triangles = fs.readFileSync(__dirname + '/d03_input.txt').toString().trim().split('\n');

var isPossibleTriangle = (a, b, c) => a + b > c && a + c > b && b + c > a;

var possible =
  triangles
  .map(spec => spec.trim().split('  ').map(v => parseInt(v))) // Split sides into array
  .filter(spec => isPossibleTriangle(spec[0],spec[1],spec[2])); // Keep only valid triangles

console.log('Possible triangles : %s of %s triangles', possible.length, triangles.length);
