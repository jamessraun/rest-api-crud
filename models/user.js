'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUnique: function (value, next) {
                    var self = this;
                    User.findOne({where: {username: value}})
                        .then(function (user) {
                            if (user && self.id !== user.id) {
                                next(user.username+' is already used!')
                            }
                            else {
                              next();
                            }
                        })
                }
            }
        },
    password: DataTypes.STRING,
    email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                fields: [sequelize.fn('lower', sequelize.col('email'))]
            },
            validate: {
                isUnique: function (value, next) {
                    var self = this;
                    User.findOne({where: {email: value}})
                        .then(function (user) {
                            if (user && self.id !== user.id) {
                                next(user.email+' already used!')
                            }
                            else {
                              next();
                            }
                        })
                },
                isemail: function(value,next){
                  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  if(!(regex.test(value)))
                    next('Email invalid!');
                }
            }
        },
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
