const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')

router.get('/', profileController.formProfile)

router.post('/', profileController.registerProfile)

router.get('/u', profileController.userProfile)

module.exports = router
