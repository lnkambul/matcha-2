var socket = io('/'+$('#user').val())
var chat = io('/'+$('#receiver').val())

$('form').submit(function(e){
	e.preventDefault()
	socket.emit('chat message', {u: $('#user').val(), msg: $('#m').val()})
	chat.emit('chat message', {u: $('#user').val(), msg: $('#m').val()})
	chat.emit('noti', $('#receiver').val())
	$('#m').val('')
	return false
})

socket.on('chat message', function({u, msg}){
	$('#messages').append($('<small>').text(`${u}: `), $('<h5>').text(msg))
})
