const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const socketController = require('../controllers/socketController')

router.get('/', userController.loginForm)

router.post('/', userController.loginUser, socketController.open)

module.exports = router
