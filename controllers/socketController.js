exports.open = (req, res, next) => {
	var user = req.session.user
   const io = req.app.get('socket')
	const nsp = io.of(`/${user}`)
   
   nsp.on('connection', socket => {
   	console.log(`socket open [${user} -> ${socket.id}]`)
		socket.on('visited', (visitor) => {
			nsp.emit('visited', visitor)
		})
		socket.on('liked', (liker) => {
			nsp.emit('liked', liker)
		})
				socket.on('chat message', ({u, msg}) => {
			nsp.emit('chat message', {u, msg})
			console.log(u+': '+msg)
		})
		socket.on('noti', (sender) => {
			console.log('notification sent '+sender)
			nsp.emit('noti', sender)
		})
		socket.on('close', () => {
			socket.disconnect(true)
			nsp.removeAllListeners('connection')
   		console.log(`socket closed [${user} -> ${socket.id}]`)
		})
	})
	res.redirect('/')
}
