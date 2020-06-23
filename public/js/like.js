var like = document.getElementsByClassName("like")

like[0].addEventListener("click", () => {
    like[0].disabled = true
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/p/like", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify( { like : like[0].id } ) )

    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText)
            console.log('label : ', response.label)
            console.log('value : ', response.value)
            console.log('initiator : ', response.initiator)
            console.log('user : ', response.user)
          } else {
            console.error(xhr.statusText)
          }
        }
    }
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    }
    setTimeout( () => {like[0].disabled = false }, 1000)
})
