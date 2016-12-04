// instructions Easter Bunny Recruiting Document the Elves intercepted
var instructions = ['L4','R2','R4','L5','L3','L1','R4','R5','R1','R3','L3','L2','L2','R5','R1','L1','L2','R2','R2','L5','R5','R5','L2','R1','R2','L2','L4','L1','R5','R2','R1','R1','L2','L3','R2','L5','L186','L5','L3','R3','L5','R4','R2','L5','R1','R4','L1','L3','R3','R1','L1','R4','R2','L1','L4','R5','L1','R50','L4','R3','R78','R4','R2','L4','R3','L4','R4','L1','R5','L4','R1','L2','R3','L2','R5','R5','L4','L1','L2','R185','L5','R2','R1','L3','R4','L5','R2','R4','L3','R4','L2','L5','R1','R2','L2','L1','L2','R2','L2','R1','L5','L3','L4','L3','L4','L2','L5','L5','R2','L3','L4','R4','R4','R5','L4','L2','R4','L5','R3','R1','L1','R3','L2','R2','R1','R5','L4','R5','L3','R2','R3','R1','R4','L4','R1','R3','L5','L1','L3','R2','R1','R4','L4','R3','L3','R3','R2','L3','L3','R4','L2','R4','L3','L4','R5','R1','L1','R5','R3','R1','R3','R4','L1','R4','R3','R1','L5','L5','L4','R4','R3','L2','R1','R5','L3','R4','R5','L4','L5','R2'];

// Cardinal points (N, E, S, W) and corresponding modifiers
var directions = [[0,1],[1,0],[0,-1],[-1,0]];

// Initial position and direction
var x = y = previousx = previousy = 0;
var heading = 0; // Heading North

// Manage path
var visitedLocations = [['visited']]; // First location is visited
var firstLocationVisitedTwiceFound = false;
var index = 1;

// loop on array values
instructions.map(current => {
  var offset = parseInt(current.substring(1, current.length)); // distance to move
  heading += current[0] == 'R' ? 1 : -1; // new heading after turning left or right
  if(heading < 0) heading = 3; // fix invalid headings
  if(heading > 3) heading = 0; // fix invalid headings
  x += directions[heading][0] * offset; // moving on X
  y += directions[heading][1] * offset; // moving on Y

  // Searching for first location visited twice
  if(!firstLocationVisitedTwiceFound){ // still haven't found what I'm looking for...
    for(i = (previousx < x ? previousx + 1: x); i <= (previousx <= x ? x : previousx - 1); i++){
      for(j = (previousy < y ? previousy + 1: y); j <= (previousy <= y ? y : previousy - 1); j++){
        if(visitedLocations[i] == undefined) visitedLocations[i] = [];
        if(visitedLocations[i][j] == undefined){
          visitedLocations[i][j] = 'visited'; // mark location as visited
        }
        else{
          console.log("First location visited twice : x = %s, y = %s, distance = %s", i, j, Math.abs(i) + Math.abs(j));
          firstLocationVisitedTwiceFound = true;
          break;
        }
      }
    }
    // Save previous location for path finding
    previousx = x;
    previousy = y;
  }
  index++;
});

console.log("Final location : x = %s, y = %s, distance = %s", x, y, Math.abs(x) + Math.abs(y));
