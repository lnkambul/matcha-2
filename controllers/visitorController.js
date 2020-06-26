const Q = require('../models/queryModel')

exports.notif = (req, res, next) => {
	var user = req.session.user
	let soc;
   const io = req.app.get('socket');

   io.on('connection', socket => {
   	console.log(user+' connected')
      soc = socket.id
      if (soc === socket.id) {
        // remove the connection listener for any subsequent 
        // connections with the same ID
        io.removeAllListeners('connection'); 
      }
		socket.on('disconnect', () => {console.log(user+' disconnected')})
		socket.on('chat message', (msg) => {
			 io.emit('chat message', msg)
			 console.log(user+': '+msg)
		})
   })
	next()
}

exports.listVisitors = (req, res) => {
	var token = req.session.token
	var adminToken = req.session.adminToken
	var visitors = null
	Q.fetchone("visits", ['visitor'], ['visited'], [req.session.user], (err, data) => {
		if (err)
			console.log(err)
		else if (data.length > 0) {
			visitors = data
		}
		else {console.log('no visitors')}
		res.render('visitors', {
			token: token, 
			 visitors: visitors,
			 adminToken: adminToken,
			 user: req.session.user
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
		res.render('likes', {
			token: token, 
			likes: likes,
			adminToken: adminToken,
			user: req.session.user
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
