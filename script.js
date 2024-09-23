const inputField = document.getElementById("input");
const button = document.getElementById("submit");

function getLocation(e) {
    e.preventDefault(); 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
}
button.addEventListener('click', getLocation);
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var url = "https://api.opencagedata.com/geocode/v1/json?q=" + latitude + "%2C" + longitude + "&key=c42e992896a843738f45ce3c097a01b8";
    fetch(url)
    .then(response => response.json())
    .then(data => {
        var st = data.results[0].components.road;
        var city = data.results[0].components.city;
        inputField.value = `${st},${city}`;
    });
}
function showError(error) {
    if (error.code == error.PERMISSION_DENIED) {
        inputField.value = "Permission Denied.";
    }
}
