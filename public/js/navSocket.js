var visit = document.getElementsByClassName("visited")
var liked = document.getElementsByClassName("liked")
var chat = document.getElementsByClassName("notif")
var socket = io('/'+$('#user').val())

socket.on('visited', function(visitor){
	if ($('#user').val() === visitor)
		visit[0].innerHTML = "*"
})
socket.on('liked', function(liker){
	if ($('#user').val() === liker)
		liked[0].innerHTML = "*"
})
socket.on('noti', function(sender){
	if ($('#user').val() === sender)
		chat[0].innerHTML = "*"
})

$(document).on("click", "#logout", function(){
	socket.emit('close')
})
