const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const userController = require('../controllers/userController')
const upload = require('../models/imageModel')


router.get('/', userController.auth, profileController.formProfile)

router.post('/', userController.auth, profileController.registerProfile)

router.get('/upload', userController.auth, profileController.formPhotos)

router.post('/upload', userController.auth, upload.single('photos'), profileController.uploadPhotos)

router.get('/u', userController.auth, profileController.userProfile)

router.get('/:match', userController.auth, profileController.matchProfile)

router.post('/geo', userController.auth, profileController.geolocation)

module.exports = router
