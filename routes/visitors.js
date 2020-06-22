const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const visitorController = require('../controllers/visitorController')

router.get('/', userController.auth, visitorController.listVisitors)

module.exports = router
