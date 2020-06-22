var like = document.getElementsByClassName("like")

like[0].addEventListener("click", () => {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/p/like", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify( { like : like[0].id } ) )
})
