var fs = require('fs');

// Load input file
var input = fs.readFileSync(__dirname + '/d06_input.txt').toString().trim().split('\n');

// Init empty arrays
var matrix = []; while(matrix.push([]) < 8);

// Count letter occurence for each line by column
input.forEach(line =>
    [...line].forEach((char, col) => matrix[col][char] = matrix[col][char] ? matrix[col][char] + 1 : 1)
);

// Comparison functions
var greater = (a,b) => a > b;
var lower = (a,b) => a < b;

// Solver
var extractResult = (occ, compareFunction) =>
  occ.map(values => Object.keys(values)
    .reduce((best,letter) => compareFunction(values[letter],values[best]) ? letter : best))
  .join('');

// Most occurence
var mostOccurence = extractResult(matrix, greater);
console.log("Part one : ", mostOccurence);

// Lowest occurence
var lowestOccurence = extractResult(matrix, lower);
console.log("Part two : ", lowestOccurence);
