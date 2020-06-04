const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const request = require('request')

router.get('/', (req, res) => {
	request({url: 'http://localhost:5000/users', json: true}, (err, response, json) => {
		if (err) throw err
		res.render('index', {
			users: json
		})
	})
})

router.get('/users', userController.list_users)

module.exports = router