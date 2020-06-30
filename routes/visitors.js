const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const visitorController = require('../controllers/visitorController')
const socketController = require('../controllers/socketController')

router.get('/', profileController.auth, socketController.notif, visitorController.listVisitors)

router.get('/likes', profileController.auth, socketController.like, visitorController.listLikes)

module.exports = router
