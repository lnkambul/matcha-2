const Q = require('../models/queryModel')

exports.auth = (req, res, next) => {
	var token = req.session.token
	if (!token)
		res.redirect('/login')
	else {
		Q.fetchone("tokens", ['username'], 'username', req.session.user, (err, result) => {
			if (result && result.length > 0) {
				Q.fetchone("users", ['admin'], 'username', req.session.user, (err, result) => {
					if (result && result.length > 0 && result[0].admin === 1) {
						next()
					} else
						res.redirect('/p')
				})
			}
			else
				res.redirect('/login')
		})
	}
}

exports.adminForm = (req, res) => {
    res.render('admin', {token: req.session.token} )
}

exports.parseForm = (req, res) => {

}