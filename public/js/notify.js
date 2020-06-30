var receiver = io('/'+$('#receiver').val())

receiver.emit('visited', $('#receiver').val())
