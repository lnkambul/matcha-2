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
			console.log("registration failed", err)
			res.redirect('/signup')
		}
		else {
			User.check(newUser, (err, result) => {
				if (err) {
					console.log("registration failed", err)
					res.redirect('/signup')
				}
				else {
					User.create(newUser, (err, result) => {
						if (err)
							console.log(err)
						else {
							console.log("registration successful")
							res.redirect('/')
						}
					})
				}
			})
		}
	})
}

exports.loginUser = (req, res) => {
	const newUser = new User(req.body)
	User.login(newUser, (err, result) => {
		if (err) {
			console.log(err)
			res.redirect('/login')
		}
		else {
			req.session.user = result
			res.redirect('/')
		}
	})
}

exports.logoutUser = (req, res) => {
	req.session.destroy((err) => {
		if (err)
			res.send('404 homie')
		else
			res.redirect('/')
	})
}
