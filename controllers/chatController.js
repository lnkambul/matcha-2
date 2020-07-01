const Q = require('../models/queryModel')

exports.messages = (req, res) => {
	var user = req.session.user
	var token = req.session.token
	var adminToken = req.session.adminToken
	var lovers = null
	Q.fetchoneMRows("likes", ['liked'], ['username', 'lovers'], [user, 1], (err, data) => {
		if (err)
			console.log(err)
		else if (data.length > 0)
			lovers = data
		res.render('lovers', {
			token: token, 
			adminToken: adminToken,
			user: req.session.user,
			lovers: lovers
		})
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
