var db = require('../models')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var passwordHash = require('../helpers/hashPassword')



var authorizedRole= (req,res,next)=> {
  let token =req.headers.token
  if(token){
    jwt.verify(token, 'rahasiacoy', function(err, decoded) {
    console.log(decoded)
      if(decoded.role==='admin'){
      console.log(decoded.role);
        req.body.role='admin'
        next()
      }else if(decoded.role==='user'){
      console.log(decoded.role);
        req.body.role='user'
        next()
      }
      else res.send({message:'login Admin cyin'})

    });
  }else {
    res.send({message:'login cyin'})
  }
}

var signup = (req,res) => {
  const saltRounds=10;

  bcrypt.hash(req.body.password,saltRounds,(err,password)=>{
    db.User.create({name:req.body.name,username:req.body.username,password:password,email:req.body.email,role:req.body.role})
    .then(user => {
      res.send(user)
    }).
    catch(err => {
     res.send(err.message)
     })
   })
}

var login = (req,res) => {
  db.User.findOne({where:{username:req.body.username}})
  .then(user => {
    console.log('-----------name',user.name);
        bcrypt.compare(req.body.password, user.password).then(function(result) {
          console.log(result);
          if(result){
            let token = jwt.sign({username:user.username,email:user.email,role:user.role},'rahasiacoy')
            console.log('asdfsdf');
            console.log(token);
            res.send(token)
          }
          else res.send('Failed')
      });
  })

}

var getAllUser = (req,res) => {
  if(req.body.role==='admin'){
    db.User.findAll()
    .then(users => {
      res.send(users)
    })
  }else {
    res.send('Login Admin cyin')
  }
}

var getUserById = (req,res) => {

  db.User.findById(req.params.id)
  .then(user => {
    res.send(user)
  })
}

var createUser = (req,res) => {
if(req.body.role==='admin'){
    db.User.create(req.body).
    then(user => {
      res.send(user)
    }).
    catch(err =>{
      console.log(err);
      res.send('err coy')
    })
  }
  else {
    res.send('Login Admin Cyin')
  }
}

var updateUser = (req,res) => {
  db.User.update(req.body,{where:{id:req.id}})
  .then(() => {
    res.send('User has been updated')
  })

}

var deleteUser = (req,res) => {
  if(req.body.role==='admin'){
    db.User.destroy({where:{id:req.id}})
    .then((user) => {
      res.send(`${user.name} has been deleted`)
    })
  }else {
    res.send('Login Admin Cyin')
  }
}

module.exports = {
  login,
  authorizedRole,
  signup,
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
