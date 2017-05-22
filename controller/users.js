var db = require('../models')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var passwordHash = require('../helpers/hashPassword')



var authorizedRole = (req,res,next)=> {
  if(req.headers.token){
    next()
  }else {
    res.send({message:'error'})
  }
}

var signup = (req,res) => {
  const saltRounds=10;

  bcrypt.hash(req.body.password,saltRounds,(err,password)=>{
    db.User.create({name:req.body.name,username:req.body.username,password:password,email:req.body.email,role:req.body.role})
    .then(user => {
      res.send(user)
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
  db.User.findAll()
  .then(users => {
    res.send(users)
  })
}

var getUserById = (req,res) => {

  db.User.findById(req.params.id)
  .then(user => {
    res.send(user)
  })
}

var createUser = (req,res) => {

  db.User.create(req.body).
  then(user => {
    res.send(user)
  })
}

var updateUser = (req,res) => {
  db.User.update(req.body,{where:{id:req.id}})
  .then(() => {
    res.send('User has been updated')
  })

}

var deleteUser = (req,res) => {
  db.User.destroy({where:{id:req.id}})
  .then((user) => {
    res.send(`${user.name} has been deleted`)
  })
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
