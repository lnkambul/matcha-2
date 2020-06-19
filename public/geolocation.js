if (navigator.geolocation){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'p/geo', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    navigator.geolocation.getCurrentPosition((position) => {
    xhr.send(JSON.stringify({
    "lat": position.coords.latitude,
    "lng": position.coords.longitude
    }))
});
}