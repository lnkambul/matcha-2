const Q = require('../models/queryModel')
const User = require('../models/userModel')
const pass = require('../models/passwordModel')
const gen = require('../models/generateUsersModel')
const admin = require('../models/adminModel')
const key = require('../models/keyGeneratorModel')
const soc = require('../controllers/socketController')
const B = require('../models/browseModel')

exports.auth = (req, res, next) => {
	var token = req.session.token
	var adminToken = req.session.adminToken
	if (!token)
		res.redirect('/login')
	else {
		Q.fetchone("tokens", ['token'], 'token', token, (err, result) => {
			if (err)
				res.redirect('/login')
			else if (result.length > 0) {
				next()
			}
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
	var adminToken = req.session.adminToken
	var user = req.session.user
	var pars = {token: token, adminToken: adminToken, user: user, suggestions: null}
	let findSuggestions = new Promise ((resolve, reject) => {
		B.findLocals(user, (err, locals) => {
			if (err)
				reject(err)
			else
				resolve(locals)
		})
	})
	findSuggestions.then((locals) => {
		pars.suggestions = locals
		res.render('index', pars)
	})
	.catch(e => {
		 console.log(e)
		 res.render('index', pars)
	})
}

exports.search_users = (req, res) => {
	var token = req.session.token
	var adminToken = req.session.adminToken
	var user = req.session.user
	var pars = {token: token, adminToken: adminToken, user: user, suggestions: null}
	let searchSuggestions = new Promise ((resolve, reject) => {
		B.findLocals(user, (err, locals) => {
			if (err)
				reject(err)
			else
				resolve(locals)
		})
	})
	searchSuggestions.then((locals) => {
		pars.suggestions = locals
		res.render('search', pars)
	})
	.catch(e => {
		 console.log(e)
		 res.render('search', pars)
	})
}

exports.find_users = (req, res) => {
	var search = req.body
	var token = req.session.token
	var adminToken = req.session.adminToken
	var user = req.session.user
	var pars = {token: token, adminToken: adminToken, user: user, suggestions: null}
	let searchSuggestions = new Promise ((resolve, reject) => {
		B.search(search, (err, found) => {
			if (err)
				reject(err)
			else
				resolve(found)
		})
	})
	searchSuggestions.then((found) => {
		pars.suggestions = found
		res.render('index', pars)
	})
	.catch(e => {
		console.log(e)
		res.redirect('/')
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
							console.log("registration successful (please check email for verification link)")
							res.redirect('/')
						}
					})
				}
			})
		}
	})
}

exports.loginUser = (req, res, next) => {
	const newUser = new User(req.body)
	/* admin navbar link */
	let promise = new Promise ((resolve, reject) => {
		User.login(newUser, (err, result) => {
			if (err) {
				reject(err)
			}
			else {
				req.session.token = result
				req.session.user = newUser.username
				resolve(req.session.user)
			}
		})
	})	
	promise.then(user => {
		let vetted = new Promise ((y, n) => {
			admin.isAdmin(user, (fail, win) => {
					if (fail) {
						throw(fail)
					}
					else {
						req.session.adminToken = win
						y(req.session.adminToken)
					}
			})
		})
		vetted.then ((status) => {
			let admin = (status === 1) ? "[admin]" : "[non-admin]"
			console.log("login successful ", admin)
			next()
		}).catch(err => { throw(err)})
	}).catch(err => { 
		console.log(err)
		res.redirect('/login')
	})
	/* eoc */
}

exports.logoutUser = (req, res, next) => {
	Q.delone("tokens", 'token', req.session.token, (err, result) => {
		if (err)
			console.log(err)
		else {
			var t = new Date()
			Q.update('profiles', ['last_seen'], t.toLocaleString(), 'username', req.session.user, () => {})
			console.log(`${req.session.user} logged out`)
			req.session.reset()
			res.redirect('/login')
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
			res.redirect('/p')
		}
		else {
			let promise = new Promise((resolve, reject) => {
				key.genPlaces(25, (error, success) => {
					if (error) {
						reject(error)
					}
					else {
						console.log(result)
						req.session.adminToken = 1
						resolve(success)
					}
				})
			})
			promise.then(places => {
				console.log(places)
				res.redirect('../admin')
			}).catch(err => { console.log(err) })
			//res.send(result)
		}
	})
}
