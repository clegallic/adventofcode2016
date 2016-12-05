var crypto = require('crypto');
var input = 'ojvtpuvg';

var password = [...'_'.repeat(8)];
var found = 0, index = 0;
var start = new Date().getTime();

while(found < 8){
  var hash = crypto.createHash('md5').update(input + index).digest("hex");
  var position = parseInt(hash.charAt(5));
  if(hash.startsWith('00000') && position < 8 && password[position] == '_'){
      password[position] = hash.charAt(6);
      found ++;
      console.log(password.join(''));
  }
  index ++;
}

console.log("Password found : %s after %s iterations in %s seconds",
  password.join(''),
  index.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  (new Date().getTime() - start) / 1000);
