const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', (req, res) => {
	res.render('resetpassword')
})

router.post('/', userController.resetPassword)

module.exports = router
