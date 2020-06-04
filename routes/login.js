const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', (req, res) => {
	res.render('login')
})

router.post('/', userController.loginUser)

module.exports = router

