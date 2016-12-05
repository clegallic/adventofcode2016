var fs = require('fs');

// Load input file
var listOfRooms = fs.readFileSync(__dirname + '/d04_input.txt').toString().trim().split('\n');

// function : returns letter occurence in a string
var letterOccurence = (letter, text) => (text.match(new RegExp(letter, 'g')) || []).length;

// function : check with checksum that a room code is valid
var isRealRoom = (roomCode, checksum) => {
    // Check that each checksum letters occurence in the code is greater than zero
    // and less or equals than the previous one
    var lastNumberOfOccurence =
      [...checksum].reduce((previous, letter) => {
            var occurences = letterOccurence(letter, roomCode);
            roomCode = roomCode.replace(new RegExp(letter,'g'), ''); // little optimisation for current and second pass
            return (previous != -1 && occurences > 0 && occurences <= previous ? occurences : -1);
          }
          ,10);

    // if roomCode seems correct, also check that there are no other letters not in the checksum
    // but with greater occurence than the last letter in the checksum
    if(lastNumberOfOccurence > 0){
      return [...roomCode].every(
        letter => letterOccurence(letter, roomCode) <= lastNumberOfOccurence
      );
    }
    else return false;
};

// function : shift string with shift cipher incredible algo
var decypher = (text, offset) => text.replace(/[a-z]/g, function (l) {
    return String.fromCharCode((l.charCodeAt(0) - 'a'.charCodeAt(0) + offset) % 26 + 'a'.charCodeAt(0));

  });

// Main
var code = listOfRooms.reduce((nb, roomSpec) => {
        var firstPart = roomSpec.split('[')[0].split('-');
        var sectorId = parseInt(firstPart.pop()); // get and remove sectorId from firstPart
        var roomCode = firstPart.join('').replace(/\-/g,'');
        var checksum = roomSpec.split('[')[1].substring(0, 5);
        var secret = decypher(firstPart.join(' '), sectorId);
        if(secret.indexOf('north') > -1){
          console.log('Secret room found ! "%s" at sectorId', secret, sectorId);
        }
        return nb + (isRealRoom(roomCode, checksum) ? sectorId : 0);
      }, 0);

console.log('Code : %s (%s rooms parsed)', code, listOfRooms.length);

// TODO : use regexp to extract sectorId, roomCode...
