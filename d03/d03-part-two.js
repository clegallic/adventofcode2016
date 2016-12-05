var fs = require('fs');

// Load input file
var triangles = fs.readFileSync(__dirname + '/d03_input.txt').toString().trim().split('\n');

var possible = 0;

var isPossibleTriangle = (a, b, c) => a + b > c && a + c > b && b + c > a;

triangles = triangles.map(spec => spec.trim().split(/\s+/).map(v => parseInt(v)));

for(var i = 0; i < triangles.length; i += 3){
  for(var j = 0; j < 3; j++){
    if(isPossibleTriangle(triangles[i][j],triangles[i + 1][j],triangles[i + 2][j])){
      possible++;
    }
  }
}

console.log('%s possible triangle of %s total', possible, triangles.length);

//.filter(spec => isPossibleTriangle(spec[0],spec[1],spec[2])); // Keep only valid triangles

//console.log('Possible triangles : %s of %s triangles', possible.length, triangles.length);
