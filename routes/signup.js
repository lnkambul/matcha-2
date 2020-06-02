const express = require('express')
const router = express.Router()
const Q = require('../models/queryModel')

router.get('/', (req, res) => {
	res.render('signup', {
		message : 'user registration'
	})
})

router.post('/', (req, res) => {
	var username = req.body.username
	var email = req.body.email
	var password = req.body.password
	Q.insert("users", ['username', 'email', 'password'], [username, email, password], (err, res) => {
		if (err) throw err
		console.log(res)
	});
	return ;
})

module.exports = router

