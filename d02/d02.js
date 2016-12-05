var fs = require('fs');
var instructions = fs.readFileSync(__dirname + '/d02_input.txt').toString().trim().split('\n');

var R = (pos) => pos.x < 2 ? {x:pos.x + 1, y:pos.y} : pos;
var L = (pos) => pos.x > 0 ? {x:pos.x - 1, y:pos.y} : pos;
var D = (pos) => pos.y < 2 ? {x:pos.x, y:pos.y + 1} : pos;
var U = (pos) => pos.y > 0 ? {x:pos.x, y:pos.y - 1} : pos;

var current = { x:1, y:1 };
var code = '';
instructions.map(line => {
    line.split('').map(direction => current = eval(direction + "(current)"));
    code += '' + (current.x + 1 + current.y * 3);
  }
);

console.log(code);
