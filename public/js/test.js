var socket = io('/james')
var visit = document.getElementsByClassName("v")

socket.on('notification', function(noti){
	if (visit[0].id === 'james')
		visit[0].innerHTML = "(1)"
})
