var fs = require('fs');
var instructions = fs.readFileSync(__dirname + '/d02_input.txt').toString().trim().split('\n');

var partOne = {
  keypad: [
    [1,2,3],
    [4,5,6],
    [7,8,9]
  ],
  start: { x:1, y:1 }
}

var partTwo = {
  keypad: [
    [0,0,1,0,0],
    [0,2,3,4,0],
    [5,6,7,8,9],
    [0,'A','B','C',0],
    [0,0,'D',0,0]
  ],
  start: { x:0, y:2 }
}

var R = (pos,kp) => pos.x == kp.length - 1 ? pos : (kp[pos.y][pos.x + 1] == 0 ? pos : {x:pos.x + 1, y:pos.y});
var L = (pos,kp) => pos.x == 0 ? pos : (kp[pos.y][pos.x - 1] == 0 ? pos : {x:pos.x - 1, y:pos.y});
var D = (pos,kp) => pos.y == kp.length - 1 ? pos : (kp[pos.y + 1][pos.x] == 0 ? pos : {x:pos.x, y:pos.y + 1});
var U = (pos,kp) => pos.y == 0 ? pos : (kp[pos.y - 1][pos.x] == 0 ? pos : {x:pos.x, y:pos.y - 1});

var solver = (instructions, part) => {
    var keypad = part.keypad, current = part.start, code = '';
    instructions.forEach(line => {
      [...line].map(direction => current = eval(direction + "(current, keypad)"));
      code += '' + keypad[current.y][current.x];
    });
    return code;
};

console.log('And the code for part one is ... %s', solver(instructions, partOne));
console.log('And the code for part two is ... %s', solver(instructions, partTwo));
