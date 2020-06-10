const Profile = require('../models/profileModel')
const Q = require('../models/queryModel')

exports.formProfile = (req, res) => {
	var token = req.session.token
	if (token)
		res.render('profileForm', {token: token})
	else
		res.redirect('/login')
}

exports.userProfile = (req, res) => {
	var token = req.session.token
	if (token)
		res.render('profile', {token: token})
	else
		res.redirect('/login')
}

exports.registerProfile = (req, res) => {
	var sess = req.session
	Q.fetchone("tokens", ['username'], 'token', sess.token, (err, result) => {
		if (result.length > 0) {
			var newProfile = new Profile(result[0].username, req.body)
			Profile.validate(newProfile, (err, success) => {
				if (err)
					console.log("error ", err)
				else {
					Profile.register(result[0].username, req.body.password, newProfile, (err, success) => {
						if (err)
							console.log('failed to update profile')
						else {
							console.log('profile updated')
							res.redirect('/')
						}
					})
				}
			})
		}
		else {
			console.log("please log in to register")
		}
	})
}
