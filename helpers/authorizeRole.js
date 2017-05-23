var jwt = require('jsonwebtoken')

var authorizeRole= (req,res,next)=> {
  let token =req.headers.token
  if(token){
    jwt.verify(token,'rahasiacoy', function(err, decoded) {
    console.log(decoded)
        req.body.role=decoded.role
        req.body.id = decoded.id
        next()
    });
  }else {
    res.send('login cyin')
  }
}

module.exports = authorizeRole;
