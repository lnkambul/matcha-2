var block = document.getElementsByClassName("block")

block[0].addEventListener("click", () => {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/p/block", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify( { block : block[0].id } ) )
})