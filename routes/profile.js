const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const upload = require('../models/imageModel')
const auth = require('../models/authModel')

router.get('/', profileController.formProfile)

router.post('/', profileController.registerProfile)

router.get('/upload', profileController.formPhotos)

router.post('/upload', upload.single('photos'), profileController.uploadPhotos)

router.get('/u', auth, profileController.userProfile)

module.exports = router
