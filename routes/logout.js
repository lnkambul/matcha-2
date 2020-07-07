const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const socketController = require('../controllers/socketController')

router.get('/', userController.logoutUser)

module.exports = router
