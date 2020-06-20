const Q = require('./queryModel')

var Browse = function(){}

Browse.like = (user, liked, callback) => {
	var par = ['username', 'liked']
	Q.fetchone("likes", par, 'liked', liked, (err, res) => {
		if (res && res.length > 0) {
			Q.delone("likes", 'liked', liked, (err, result) => {
				if (err)
					callback(err, null)
				else
					callback(null, `${user} unliked ${liked}`)
			})
		} else {
			Q.insert("likes", par, [user, liked], (err, result) => {
				if (err)
					callback(err, null)
				else
					callback(null, `${user} liked ${liked}`)
			})
		}
	})
}

Browse.visit = (user, visitor, callback) => {
	var par = ['username', 'visitor']
	Q.insert("visits", par, [user, visitor], (err, result) => {
		if (err)
			callback(err)
		else
			callback(null, `${user} visited ${visitor}`)
	})
}

module.exports = Browse
