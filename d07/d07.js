var fs = require('fs');

// Load input file
var input = fs.readFileSync(__dirname + '/d07_input.txt').toString().trim().split('\n');

var tlsIp = input.reduce((nb, current) => {
  var ipArray = [...current];
  var isInBracket = false, var tlsIp = false;
  for(var i = 0; i < ipArray.length - 2; i++){
    if(
      ipArray[i] != ipArray[i+1]
      && ipArray[i] + ipArray[i + 1] == ipArray[i+3] + ipArray[i + 2]){
      if(isInBracket){
        tlsIp = false; break;
      }
      else{
        tlsIp = true;
      }
    }
    if(ipArray[i] == '[') isInBracket = true;
    if(ipArray[i] == ']') isInBracket = false;
  }
  return tlsIp ? nb + 1 : nb;
}, 0);

console.log('There a %s TLS IP for %s IP', tlsIp, input.length);
