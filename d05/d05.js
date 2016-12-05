var crypto = require('crypto');
var input = 'ojvtpuvg';

var password = '';
var index = 0;

while(password.length < 8){
  var hash = crypto.createHash('md5').update(input + index).digest("hex");
  if(hash.startsWith('00000')){
      password += hash.charAt(5);
      console.log(password);
  }
  index ++;
}

console.log("Password found : %s after %s iterations", password, index.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
