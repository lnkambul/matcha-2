const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('signup', {
		message : 'user registration'
	})
})

router.post('/', (req, res) => {
	var username = req.body.username
	var email = req.body.email
	var password = req.body.password
	user.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err, res) => {
			if (err)
				console.log(err)
			})
		return ;
})

module.exports = router
