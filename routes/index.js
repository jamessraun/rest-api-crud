var express = require('express')
var controller = require('../controller/users')
var router = express.Router()

router.post('/signup',controller.signup)
router.post('/login',controller.login)
router.get('/users',controller.authorizedRole,controller.getAllUser)
router.get('/users/:id',controller.authorizedRole,controller.getUserById)
router.post('/users',controller.authorizedRole,controller.createUser)
router.put('/users/:id',controller.authorizedRole,controller.updateUser)
router.delete('/users/:id',controller.authorizedRole,controller.deleteUser)


module.exports = router;
