const Q = require('./queryModel')
const S = require('./securityModel')

var User = function(user) {
	this.username = user.username
	this.email = user.email
	this.password = user.password
}

User.validate = (user, callback) => {
	var e = {username: null, email: null, password: null}
	var result = {username: null, email: null, password: null}
	S.string("username", user.username, (err, res) => {
		e.username = err
		result.username = res})
	S.email(user.email, (err, res) => {
		e.email = err
		result.email = res})
	S.password(user.password, (err, res) => {
		e.password = err
		result.password = res})
	if (e.username || e.email || e.password)
		callback(e, result)
	else
		callback(null, result)
}

User.check = (user, callback) => {
	var e = {username: null, email: null}
	var msg = 'not available'
	Q.fetchone("users", 'username', 'username', user.username, (err, res) => {
		if (res.length > 0)
			callback('(username not available)')
		else {
			Q.fetchone("users", 'email', 'email', user.email, (err, res) => {
				if (res.length > 0)
					callback('(email not available)')
				else
					callback(null, 'success')
			})
		}
	})
}

User.create = (user, callback) => {
	Q.insert("users", ['username', 'email', 'password'], [user.username, user.email, user.password], (err, res) => {
		if (err)
			callback(err, null)
		else
			callback(null, res)
	})
}

module.exports = User
