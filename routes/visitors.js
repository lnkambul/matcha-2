const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const visitorController = require('../controllers/visitorController')

router.get('/', profileController.auth, visitorController.notif, visitorController.listVisitors)

router.get('/likes', profileController.auth,visitorController.notif,  visitorController.listLikes)

module.exports = router
