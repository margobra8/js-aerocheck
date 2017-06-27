var url = "http://api.waqi.info/feed/geo::lat;:lng/?token=:token";
var errorText = document.getElementById("error");
var city = document.getElementById("loc");
var aqi = document.getElementById("aqi");
var welcome = document.getElementById("welcome");
var content = document.getElementById("main");

function obtenerLocalizacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(procesarPosicion, showError);
    } else {
        errorText.className = "";
        errorText.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showError(error) {
    errorText.className = "";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorText.innerHTML = "User denied the request for Geolocation.<br />Please turn on 'Location' or access with HTTPS."
            break;
        case error.POSITION_UNAVAILABLE:
            errorText.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            errorText.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            errorText.innerHTML = "An unknown error occurred."
            break;
    }
}

function procesarPosicion(position) {

    welcome.className = "hidden-element";
    content.className = "";

    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var url = "https://api.waqi.info/feed/geo:" + lat + ";" + long + "/?token=" + "4e74e4e29ca5b7b534c509c493f5cf41c938aafb";
    var jsonRaw = hacerGetHTTP(url);
    var jsonObjeto = JSON.parse(jsonRaw);

    mostrarValores(jsonObjeto.data.aqi, jsonObjeto.data.city.name);
}

function ipLocalizacion() {

    welcome.className = "hidden-element";
    content.className = "";

    var url = "https://api.waqi.info/feed/here/?token=" + "4e74e4e29ca5b7b534c509c493f5cf41c938aafb";
    var jsonRaw = hacerGetHTTP(url);
    var jsonObjeto = JSON.parse(jsonRaw);

    mostrarValores(jsonObjeto.data.aqi, jsonObjeto.data.city.name);
}

function mostrarValores(aqiParam, cityParam) {
    aqiVal = aqiParam;
    city.innerHTML = cityParam;

    if (aqiVal >= 0 && aqiVal <= 50) {
        $("#aqi").html(aqiVal + " · Good");
    } else if (aqiVal > 50 && aqiVal <= 100) {
        $("#aqi").html(aqiVal + " · Moderate");
    } else if (aqiVal > 100 && aqiVal <= 150) {
        $("#aqi").html(aqiVal + " · Harmful");
    } else if (aqiVal > 150 && aqiVal <= 200) {
        $("#aqi").html(aqiVal + " · Unhealthy");
    } else if (aqiVal > 200 && aqiVal <= 300) {
        $("#aqi").html(aqiVal + " · Very unhealthy");
    } else if (aqiVal > 300) {
        $("#aqi").html(aqiVal + " · Hazardous");
    }

    if (aqiVal >= 0 && aqiVal <= 50) {
        $("#aqi").css("background-color", "green");
    } else if (aqiVal > 50 && aqiVal <= 100) {
        $("#aqi").css("background-color", "#cccc00");
    } else if (aqiVal > 100 && aqiVal <= 150) {
        $("#aqi").css("background-color", "orange");
    } else if (aqiVal > 150 && aqiVal <= 200) {
        $("#aqi").css("background-color", "red");
    } else if (aqiVal > 200 && aqiVal <= 300) {
        $("#aqi").css("background-color", "purlple");
    } else if (aqiVal > 300) {
        $("#aqi").css("background-color", "black");
    }

}

function hacerGetHTTP(laURL) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", laURL, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}