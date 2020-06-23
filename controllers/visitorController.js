const Q = require('../models/queryModel')

exports.listVisitors = (req, res) => {
	var token = req.session.token
	var visitors = null
	Q.fetchone("visits", ['visitor'], ['visited'], [req.session.user], (err, data) => {
		if (err)
			console.log(err)
		else if (data.length > 0) {
			visitors = data
		}
		else {console.log('no visitors')}
		res.render('visitors', {token: token, visitors: visitors})
	})
}

exports.listLikes = (req, res) => {
	var token = req.session.token
	var likes = null
	Q.fetchone("likes", ['username'], 'liked', req.session.user, (err, data) => {
		if (err)
			console.log(err)
		else if (data.length > 0) {
			likes = data
		} else {console.log('no one likes you')}
		res.render('likes', {token: token, likes: likes})
	})
}

exports.lost = (req, res, next) => {
	var m = req.params.map
	if (m == 'visitors')
		next()
	else
		res.send('lost')
}
