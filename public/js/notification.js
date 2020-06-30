var socket = io($('#receiver').val())

$('form').submit(function(e){
	e.preventDefault()
	socket.emit('chat message', $('#m').val())
	socket.emit('notification', 'you have a visitor')
	$('#m').val('')
	return false
})

socket.on('chat message', function(msg){
	$('#messages').append($('<h4>').text(msg))
})
