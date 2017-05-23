var express = require('express')
var controller = require('../controller/users')
var authorizeRole = require('../helpers/authorizeRole')
var router = express.Router()

router.post('/signup',controller.signup)
router.post('/login',controller.login)
router.get('/users',authorizeRole,controller.getAllUser)
router.get('/users/:id',authorizeRole,controller.getUserById)
router.post('/users',authorizeRole,controller.createUser)
router.put('/users/:id',authorizeRole,controller.updateUser)
router.delete('/users/:id',authorizeRole,controller.deleteUser)


module.exports = router;
