

exports.showProfile = (req, res) => {
	var token = req.session.token
	if (req.session.token)
		res.render('profileForm', {token: token})
	else
		res.send('not logged in')
}

exports.registerProfile = (req, res) => {
	res.render('profile')
}
