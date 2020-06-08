const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')

router.get('/', profileController.showProfile)

router.post('/', profileController.registerProfile)

module.exports = router
