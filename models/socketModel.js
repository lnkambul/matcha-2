const Q = require('./queryModel')

exports.logChat = (user, sender, receiver, msg, callback) => {
	if (user === sender) {
		Q.insert('chats', ['sender', 'receiver', 'message'], [sender, receiver, msg], (err, res) => {
  				callback(`${sender} sent a message to ${receiver}`)
		})	 
	} else if (user === receiver)
		callback(`${user} received a message from ${sender}`)
}

exports.logVisit = (user, sender, receiver, callback) => {
	if (user === sender) {
		Q.insert('notifications', ['sender', 'receiver', 'type'], [sender, receiver, 'visit'], (err, res) => {
			callback(`${sender} sent a notification to ${receiver} [visit]`)
		})
	} else if (user === receiver)
		callback(`${user} received a notification from ${sender} [visit]`)
}

exports.logNoti = (user, sender, receiver, callback) => {
	if (user === sender) {
		Q.insert('notifications', ['sender', 'receiver', 'type'], [sender, receiver, 'chat'], (err, res) => {
			callback(`${sender} sent a notification to ${receiver} [message]`)
		})
	} else if (user === receiver)
		callback(`${user} received a notification from ${sender} [message]`)
}

exports.logLike = (user, sender, receiver, callback) => {
	if (user === sender) {
		Q.insert('notifications', ['sender', 'receiver', 'type'], [sender, receiver, 'like'], (err, res) => {
			callback(`${sender} sent a notification to ${receiver} [like]`)
		})
	} else if (user === receiver)
		callback(`${user} received a notification from ${sender} [like]`)
}

exports.notifications = (user, callback) => {
	Q.fetchone('notifications', ['sender', 'type'], 'receiver', user, (err, res) => {
		if (err)
			console.log(err)
		else if (res.length > 0) {
			let promise = new Promise ((resolve, reject) => {
				var n = {c: 0, v: 0, l: 0}
				for (let i in res) {
					if (res[i].type === 'chat')
						n.c++
					else if (res[i].type === 'visit')
						n.v++
					else if (res[i].type === 'like')
						n.l++
				}
				resolve(n)
			})
			promise.then(n => {callback(n)})
		} else
			console.log('no notifications')
	})
}
