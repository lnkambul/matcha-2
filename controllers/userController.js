const Q = require('../models/queryModel')
const User = require('../models/userModel')
const pass = require('../models/passwordModel')
const gen = require('../models/generateUsersModel')

exports.auth = (req, res, next) => {
	var token = req.session.token
	if (!token)
		res.redirect('/login')
	else {
		Q.fetchone("tokens", ['token'], 'token', token, (err, result) => {
			if (err)
				res.redirect('/login')
			else if (result.length > 0) 
				next()
			else
				res.redirect('/login')
		})
	}
}

exports.loginForm = (req, res) => {
	if (req.session.token)
		res.redirect('/logout')
	else
		res.render('login')
}

exports.list_users = (req, res) => {
	var token = req.session.token
	Q.fetchall("profiles", (err, data) => {
		if (err)
			res.redirect('/p')
		else if (data.length > 0) {
			res.render('index', {
				token: token,
				users: data
			})
		} else
			res.redirect('/p')
	})
}

exports.formSignup = (req, res) => {
	if (req.session.token)
		res.redirect('/logout')
	else
		res.render('signup')
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
			req.session.token = result
			req.session.user = newUser.username
			console.log("login successful")
			res.redirect('/')
		}
	})
}

exports.logoutUser = (req, res) => {
	Q.delone("tokens", 'token', req.session.token, (err, result) => {
		if (err)
			console.log(err)
		else {
			console.log(`${req.session.user} logged out`)
			req.session.reset()
			res.redirect('/')
		}
	})
}

exports.verifyUser = (req, res) => {
	var token = req.params.token
	User.verify(token, (err, result) => {
		if (err) {
			console.log("verification failed")
			res.redirect('/signup')
		}
		else {
			console.log("user verified")
			res.redirect('/login')
		}
	})
}

exports.createAdmin = (req, res) => {
	gen.initAdmin(req.session.user, (result) => {
			res.send(result)
	})
}

exports.vAdmin =(req, res) => {
	gen.verifyAdmin(req.session.user, req.body.key, (err, result) => {
		if (err) {
			console.log(err)
			res.redirect('/')
		}
		else {
			console.log(result)
			res.redirect('../admin')
			//res.send(result)
		}
	})
}