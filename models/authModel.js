
const auth = (req, res, next) => {
	var token = req.session.token
	if (!token) {
		res.redirect('/login')
	} else {
		next()
	}
}

module.exports = auth
