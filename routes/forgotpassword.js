const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const passwordController = require('../controllers/passwordController')

router.get('/', (req, res) => {
	res.render('forgotpassword')
})

router.post('/', passwordController.forgotPassword)

router.get('/:token', passwordController.resetForm)

router.post('/:token', passwordController.resetPassword)

module.exports = router
