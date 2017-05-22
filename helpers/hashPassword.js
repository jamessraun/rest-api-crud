var bcrypt = require('bcrypt')

let passwordHash= (input) => {
const salt=10;
bcrypt.hash(123,salt,(err,password)=>{
      return password;
  })
}
module.exports = passwordHash
