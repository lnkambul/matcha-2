const Q = require('../models/queryModel')
const User = require('../models/userModel')

exports.list_users = (req, res) => {
	Q.fetchall("users", (err, data) => {
		if (err)
			res.send(err)
		res.send(data)
	});
}

exports.registerUser = (req, res) => {
	const newUser = new User(req.body)
	User.validate(newUser, (err, result) => {
		if (err) {
			console.log("login failed", err)
			res.redirect('/signup')
		}
		else {
			User.check(newUser, (err, result) => {
				if (err) {
					console.log("login failed", err)
					res.redirect('/signup')
				}
				else {
					User.create(newUser, (err, result) => {
						if (err)
							console.log(err)
						else {
							console.log("login successful")
							res.redirect('/')
						}
					})
				}
			})
		}
	})
}
