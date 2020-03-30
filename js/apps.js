/* eslint-env es6 */
/* eslint-env browser */

/* ================== Apps js file ============= */

/* ------ Weather app -------- */


// Function AjaxGET (source: https://openclassrooms.com/fr/courses/3306901-creez-des-pages-web-interactives-avec-javascript/3626516-interrogez-un-serveur-web )


function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {

            callback(req.responseText);
        } else {
           /* 
            console.error(req.status + " " + req.statusText + " " + url);*/
        }
    });
    req.addEventListener("error", function () {
        /*
        console.error("Erreur réseau avec l'URL " + url);*/
    });
    req.send(null);
}



//variable declarations
var weatherNameElt = document.getElementById("weather-name");

var weatherWindElt = document.getElementById("weather-wind");

var weatherTempElt = document.getElementById("weather-temp");

var weatherCloudElt = document.getElementById("weather-cloud");


var weatherWind2Elt = document.getElementById("weather-wind2");

var weatherTemp2Elt = document.getElementById("weather-temp2");

var weatherCloud2Elt = document.getElementById("weather-cloud2");



// Get datas on api.openweathermap.org

ajaxGet("http://api.openweathermap.org/data/2.5/weather?q=Stockholm&APPID=0b0ebfd8043e4d1ca9870164f1abb64e", function (reponse) {
    
    // 
    var infos = JSON.parse(reponse);
    
    weatherNameElt.innerHTML = infos.name;
    
    weatherTempElt.innerHTML = "Actual temperature : " + Math.round(infos.main.temp - 273) + "°C";
    
    weatherWindElt.innerHTML = "Wind speed : " + (infos.wind.speed * 3,6) + " km/h.";
    
    weatherCloudElt.src = "http://openweathermap.org/img/wn/" + infos.weather[0].icon + "@2x.png";
});

ajaxGet("http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&APPID=0b0ebfd8043e4d1ca9870164f1abb64e", function (reponse) {
    
    // list[5] = 24h later
    var infos2 = JSON.parse(reponse);
    
    weatherTemp2Elt.innerHTML = "Expect temperature : " + Math.round(infos2.list[5].main.temp - 273) + "°C";
    
    weatherWind2Elt.innerHTML = "Wind speed : " + (infos2.list[5].wind.speed * 3,6) + " km/h.";
    
    weatherCloud2Elt.src = "http://openweathermap.org/img/wn/" + infos2.list[5].weather[0].icon + "@2x.png";
});