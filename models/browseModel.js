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

Browse.visit = (user, match, callback) => {
	var par = ['visitor', 'visited', 'year', 'month']
	var msg = `${user} visited ${match}`
	var t = new Date()
	Q.fetchoneMRows("visits", ['visited'], ['visitor', 'visited', 'month'], [user, match, t.getMonth()], (err, data) => {
		if (data && data.length > 0) {
				callback(null, msg)
		} else {
			Q.insert("visits", par, [user, match, t.getFullYear(), t.getMonth()], (err, result) => {
				if (err)
					callback(err)
				else
					callback(null, msg)
			})
		}
	})
}

Browse.suspend = (user, suspender, callback) => {
	var params = ['suspended']
	Q.fetchone("users", params, 'username', user, (err, res) =>{
		if (res && res.length > 0) {
			var val = (res[0].suspended) ? 0 : 1
			Q.update("users", params, val, 'username', user, (err,res) => {
				if (err)
					console.log(err)
				else if (val === 1)
					console.log(`${suspender} suspended ${user}`)
				else
					console.log(`${suspender} unsuspended ${user}`)

			})
		} else {
			console.log("user " + user + " not found")
		}
	})
}

Browse.block = (user, blocker, callback) => {
	var params = ['username', 'blocker']
	var pvals = [user, blocker]
	Q.fetchoneMRows("blocked", ['id'], params, pvals, (err, res) => {
		if (res && res.length > 0) {
			Q.deloneMRows("blocked", params, pvals, (err, res)=> {
				if (err)
					console.log(err)
				else
					console.log(`${blocker} unblocked ${user}`)
			})
		}
		else
			Q.insert("blocked", params, pvals, (err, res) => {
				if (err)
					console.log(err)
				else
					console.log(`${blocker} blocked ${user}`)
			})
	})
}

Browse.likeTweaked = (user, liked, callback) => {
	var params = ['username', 'liked']
	var pvals = [user, liked]
	Q.fetchoneMRows("likes", ['id'], params, pvals, (err, res) => {
		if (res && res.length > 0) {
			Q.deloneMRows("likes", params, pvals, (err, result) => {
				if (err)
					callback(err, null)
				else 
					callback(null, `${user} unliked ${liked}`)
			})
		} else {
			Q.insert("likes", params, pvals, (err, result) => {
				if (err)
					callback(err, null)
				else
					callback(null, `${user} liked ${liked}`)
			})
		}
	})
}

Browse.checkMatch = (user, liked, callback) => {
	var params = ['username', 'liked']
	var pvals = [liked, user]
	Q.fetchoneMRows("likes", ['liked', 'lovers'], params, pvals, (err, res) => {
		 if (res && res.length > 0) {
		 	if (res[0].lovers == 1) {
				Q.updateMRows("likes", ['lovers'], 0, params, [user, liked], (err, res) => {
					if (err)
						callback(err)
					else {
						Q.updateMRows("likes", ['lovers'],0, params, pvals, (err, res) => {
							if (err)
								callback(err)
							else
								callback(null, `${user} & ${liked} are not a match :(`)
						})
					}
				})
			} else {
				Q.updateMRows("likes", ['lovers'], 1, params, pvals, (err, success) => {
					if (err)
						callback(err+" mxm", null)
					else {
						Q.updateMRows("likes", ['lovers'], 1, params, [user, liked], (err, success) => {
							callback(null, `${user} & ${liked} like each other!`)
						})
					}
				})
			}
		}
	})
}

module.exports = Browse
