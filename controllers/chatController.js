
exports.messages = (req, res) => {
	var token = req.session.token
	var adminToken = req.session.adminToken
	res.render('chat', {
		token: token, 
		adminToken: adminToken,
		user: req.session.user,
		receiver: req.params.match
	})
}

exports.chat = (req, res) => {
	var token = req.session.token
	var adminToken = req.session.adminToken
	res.render('chat', {
		token: token, 
		adminToken: adminToken,
		user: req.session.user,
		receiver: req.params.match
	})
}
