let soc = []

exports.notif = (req, res, next) => {
	var user = req.session.user
	let receiver = 'james'
   const io = req.app.get('socket');
	const nsp = io.of(`/${receiver}`)
	//const nsp = io.of(`/james`)

   nsp.on('connection', socket => {
      soc.push(socket.id)
      req.session.soc = soc[0]
   	console.log(`${user} connected [namespace: ${soc[0]}]`)
      if (soc[0] === socket.id) {
        // remove the connection listener for any subsequent 
        // connections with the same ID
        nsp.removeAllListeners('connection'); 
      }
		socket.on('chat message', (msg) => {
			nsp.emit('chat message', msg)
			console.log(user+': '+msg)
		})
		socket.on('disconnect', () => {console.log(user+' disconnected')})
	})
	next()
}

exports.like = (req, res, next) => {
	const user = req.session.user
   const io = req.app.get('socket');
	const nsp = io.of(`/james`)

	nsp.on('connection', socket => {
		soc.push(socket.id)
      req.session.soc = soc[0]
   	console.log(`${user} connected [namespace: ${soc[0]}]`)
		socket.on('chat message', (msg) => {
			nsp.emit('chat message', msg)
			console.log(msg)
		})
		socket.on('notification', (noti) => {
			nsp.emit('notification', noti)
			console.log(noti)
		})
	})
	next()
}
