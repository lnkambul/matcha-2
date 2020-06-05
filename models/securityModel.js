const bcrypt = require('bcrypt')
const crypto = require('crypto-js')

var Secure = function(){}

Secure.password = (pass, callback) => {
	var msg = "password must contain at least one "
	if (pass.length < 8)
		callback("password too short", null)
	else if (pass.search(/[0-9]/) < 0)
		callback(msg+"digit")
	else if (pass.search(/[A-Z]/) < 0)
		callback(msg+"uppercase character")
	else if (pass.search(/[a-z]/) < 0)
		callback(msg+"lowercase character")
	else if (pass.search(/[!@#$%^&*]/) < 0)
		callback(msg+"special character")
	else
		callback(null, "password is secure")
}

Secure.string = (field, str, callback) => {
	msg = field+"must be atleast"
	if (str.length < 3)
		callback(field+" too short")
	else if (!str.match(/^[a-zA-Z0-9_]+$/))
		callback(field+" may only contain alphabets, numbers & an underscore")
	else
		callback(null, "good "+field)
}

Secure.email = (addr, callback) => {
	var e = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
	if (!addr.match(e))
		callback("invalid email", null)
	else
		callback(null, "valid email")
}

Secure.createHash = (pass, callback) => {
	bcrypt.hash(pass, 10, (err, hash) => {
		if (err)
			callback(err)
		else
			callback(null, hash)
	})
}

Secure.findHash = (pass, hash, callback) => {
	bcrypt.compare(pass, hash, (err, res) => {
		if (res == true) 
			callback(null, "success")
		else 
			callback("wrong password", null)
	})
}

Secure.createToken = (pass, callback) => {
	var c = crypto.AES.encrypt(pass+Date.now(), 'test').toString()
	callback(c)
}

module.exports = Secure
