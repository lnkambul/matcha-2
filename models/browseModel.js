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

Browse.block = (user, blocker, callback) => {
	var params = ['blocked']
	Q.fetchone("users", params, 'username', user, (err, res) =>{
		if (res && res.length > 0) {
			var val = (res[0].blocked) ? 0 : 1
			Q.update("users", params, val, 'username', user, (err,res) => {
				if (err)
					console.log(err)
				else if (val === 1)
					console.log(`${blocker} blocked ${user}`)
				else
					console.log(`${blocker} unblocked ${user}`)

			})
		} else {
			console.log("user" + user + "not found")
		}
	})
}

Browse.flag = (user, flagger, callback) => {
	var params = ['username', 'flagger']
	var pvals = [user, flagger]
	Q.fetchoneMRows("flagged", ['id'], params, pvals, (err, res) => {
		if (res && res.length > 0) {
			Q.deloneMRows("flagged", params, pvals, (err, res)=> {
				if (err)
					console.log(err)
				else
					console.log(`${flagger} unflagged ${user}`)
			})
		}
		else
			Q.insert("flagged", params, pvals, (err, res) => {
				if (err)
					console.log(err)
				else
					console.log(`${flagger} flagged ${user}`)
			})
	})
}

module.exports = Browse
