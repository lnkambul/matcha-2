const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const visitorController = require('../controllers/visitorController')

router.get('/', profileController.auth, visitorController.listVisitors)

router.get('/likes', profileController.auth, visitorController.listLikes)

module.exports = router
