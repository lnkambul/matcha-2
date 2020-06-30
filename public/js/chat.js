var socket = io('/'+$('#user').val())
var chat = io('/'+$('#receiver').val())

$('form').submit(function(e){
	e.preventDefault()
	socket.emit('chat message', $('#m').val())
	chat.emit('chat message', $('#m').val())
	$('#m').val('')
	return false
})

socket.on('chat message', function(msg){
	$('#messages').append($('<h4>').text(msg))
})
