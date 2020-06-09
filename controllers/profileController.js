const Profile = require('../models/profileModel')
const Q = require('../models/queryModel')

exports.showProfile = (req, res) => {
	var token = req.session.token
	if (req.session.token)
		res.render('profileForm', {token: token})
	else
		res.render('profileForm', {token: token})
}

exports.registerProfile = (req, res) => {
	var sess = req.session
	var user = 'kori'
	Q.fetchone("tokens", ['username'], 'username', user, (err, result) => {
		if (result.length > 0) {
			var newProfile = new Profile(result[0].username, req.body)
			Profile.validate(newProfile, (err, success) => {
				if (err)
					console.log("error ", err)
				else {
					Profile.register(newProfile, (err, success) => {
						if (err)
							console.log(err)
						else
							console.log(success)
						console.log(newProfile)
					})
				}
					res.redirect('/p')
			})
		}
		else {
			console.log("please log in to register")
		}
	})
}
