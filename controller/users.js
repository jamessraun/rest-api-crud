var db = require('../models')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')


var signup = (req,res) => {
  var saltRounds=10;

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
        bcrypt.compare(req.body.password, user.password).then(result => {
          if(result){
            let token = jwt.sign({id:user.id,name:user.name,username:user.username,email:user.email,role:user.role},'rahasiacoy')
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
    if(req.params.id==req.body.id){
      console.log('masuk sini');
      db.User.findById(req.params.id)
      .then(user => {
        res.send(user)
      })
    }else res.send('You are not authorized')
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
  if(req.params.id==req.body.id){
    db.User.update(req.body,{where:{id:req.id}})
    .then((user) => {
      res.send(`user has been updated`)
    })
  }else res.send('You are not authorized')
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
  login:login,
  signup:signup,
  getAllUser:getAllUser,
  getUserById:getUserById,
  createUser:createUser,
  updateUser:updateUser,
  deleteUser:deleteUser
}
