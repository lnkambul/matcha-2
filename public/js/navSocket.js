var visit = document.getElementsByClassName("visited")
var liked = document.getElementsByClassName("liked")
var chat = document.getElementsByClassName("notif")
var socket = io('/'+$('#user').val())

socket.emit('refresh')

socket.on('notifications', function({chats, visits, likes}){
	if (chats > 0)
		chat[0].innerHTML = `<sup style="color:red">${chats}</sup>`
	if (visits > 0)
		visit[0].innerHTML = `<sup style="color:teal">${visits}</sup>`
	if (likes > 0)
		liked[0].innerHTML = `<sup style="color:pink">${likes}</sup>`
})
$(document).on("click", "#logout", function(){
	socket.emit('close')
})
