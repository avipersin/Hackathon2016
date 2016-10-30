var x = document.getElementById("xaddress");
var y = document.getElementById("yaddress");

$(document).ready(getLocation);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    $(x).val(position.coords.latitude);
    $(y).val(position.coords.latitude);
}
