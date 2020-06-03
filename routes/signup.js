const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', (req, res) => {
	res.render('signup')
})

router.post('/', userController.registerUser)

module.exports = router

