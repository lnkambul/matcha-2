const Q = require('../models/queryModel')

exports.listVisitors = (req, res) => {
	var token = req.session.token
	var adminToken = req.session.adminToken
	var visitors = null
	var notifications = null
	var user = req.session.user
	Q.fetchone("visits", ['visitor'], ['visited'], [user], (err, data) => {
		if (err)
			console.log(err)
		else if (data.length > 0) 
			visitors = data
		Q.fetchoneMRows('notifications', ['sender'], ['receiver', 'type'], [user, 'visit'], (err, notis) => {
			if (err)
				console.log(err)
			else if (notis.length > 0) 
				notifications = notis
			res.render('visitors', {
				token: token, 
				visitors: visitors,
				adminToken: adminToken,
				user: user,
				notifications: notifications
			})
		})
	})
}

exports.listLikes = (req, res) => {
	var token = req.session.token
	var adminToken = req.session.adminToken
	var likes = null
	Q.fetchone("likes", ['username'], 'liked', req.session.user, (err, data) => {
		if (err)
			console.log(err)
		else if (data.length > 0) {
			likes = data
		} else {console.log('no one likes you')}
		Q.deloneMRows('notifications', ['receiver', 'type'], [req.session.user, 'like'], () => {console.log(`${req.session.user} notifications reset [likes]`)})
		res.render('likes', {
			token: token, 
			likes: likes,
			adminToken: adminToken,
			user: req.session.user
		})
	})
}

exports.notifications = (req, res) => {
	var user = req.session.user
	var token = req.session.token
	var adminToken = req.session.adminToken
	var chats = null
	var likes = null
	var visits = null
	var notifications = null
	let promise = new Promise ((resolve) => {
		Q.fetchoneMAndOr3('notifications', ['sender', 'type'], ['receiver', 'type'], [user, 'chat'], [user, 'like'], [user, 'visit'], (err, notis) => {
			var n = {c: [], v: [], l: []}
			for (let i in notis) {
				if (notis[i].type === 'chat')
					n.c = [...n.c, notis[i].sender]
				else if (notis[i].type === 'like')
					n.l = [...n.l, notis[i].sender]
				else if (notis[i].type === 'visit')
					n.v = [...n.v, notis[i].sender]
			}
			resolve(n)
		})
	})
	promise.then(n => {
		res.render('notifications', {
			token: token,
			chats: n.c,
			likes: n.l,
			visits: n.v,
			adminToken: adminToken,
			user: user,
		})
	})
}

exports.lost = (req, res, next) => {
	var m = req.params.map
	if (m == 'visitors')
		next()
	else
		res.send('lost')
}
