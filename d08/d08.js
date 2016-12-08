var fs = require('fs');

// Load input file
var input = fs.readFileSync(__dirname + '/d08_input.txt').toString().trim().split('\n');

var display = []; while(display.push(Array(50).fill('')) < 6);

var reverseArray = (arr) => {
  return arr[0].map(function(col, i) {
    return arr.map(function(row) {
      return row[i]
    })
  });
}

input.forEach((operation,index) => {
    console.log('%s : [%s]', index, operation);
    switch(operation.split(' ')[0]){
      case 'rect' :
        var A = parseInt(operation.split(' ')[1].split('x')[0]);
        var B = parseInt(operation.split(' ')[1].split('x')[1]);
        display.forEach((row,index) => index < B ? row.fill('#',0,A) : '');
        break;
      case 'rotate' :
        var type = operation.split(' ')[1];
        var position = parseInt(operation.split(' ')[2].split('=')[1]);
        var by = parseInt(operation.split(' ')[4]);
        var originalDisplay = display.map(row => row.slice());
        switch(type){
          case 'column' :
              var newArray = reverseArray(display);
              var l = newArray[position].length;
              newArray[position] = newArray[position].slice(l - by, l).concat(newArray[position].slice(0,l - by));
              display = reverseArray(newArray);
            break;
          case 'row' :
            var l = display[position].length;
            display[position] = display[position].slice(l - by, l).concat(display[position].slice(0,l - by));
            break;
        }
        break;
    }
    console.log(display.map(row => row.map(pixel => pixel == '#' ? pixel + '  ' : '_  ').join('')).join('\n'));
});

console.log('Number of pixel : ', display.reduce((result, row) => result += row.reduce((resultSub, value) => resultSub += (value == '#' ? 1 : 0),0), 0));
