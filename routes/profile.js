const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const upload = require('../models/imageModel')

router.get('/', profileController.formProfile)

router.post('/', profileController.registerProfile)

router.get('/upload', profileController.formPhotos)

router.post('/upload', upload.array('photos'), profileController.uploadPhotos)

router.get('/u', profileController.userProfile)

module.exports = router
