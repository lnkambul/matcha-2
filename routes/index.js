const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.auth, userController.list_users)

module.exports = router
