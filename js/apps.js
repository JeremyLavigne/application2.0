/* eslint-env es6 */
/* eslint-env browser */

/* ================== Apps js file ============= */




/* ================== Weather app ==================== */


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



// variable declarations
var weatherNameElt = document.getElementById("weather-name");

var weatherWindElt = document.getElementById("weather-wind");

var weatherTempElt = document.getElementById("weather-temp");

var weatherCloudElt = document.getElementById("weather-cloud");


var weatherWind2Elt = document.getElementById("weather-wind2");

var weatherTemp2Elt = document.getElementById("weather-temp2");

var weatherCloud2Elt = document.getElementById("weather-cloud2");



// Get datas on api.openweathermap.org

// Today
ajaxGet("http://api.openweathermap.org/data/2.5/weather?q=Stockholm&APPID=0b0ebfd8043e4d1ca9870164f1abb64e", function (reponse) {
    
    // 
    var infos = JSON.parse(reponse);
    
    weatherNameElt.innerHTML = infos.name;
    
    weatherTempElt.innerHTML = "Actual temperature : " + Math.round(infos.main.temp - 273) + "°C";
    
    weatherWindElt.innerHTML = "Wind speed : " + (infos.wind.speed * 3,6) + " km/h.";
    
    weatherCloudElt.src = "http://openweathermap.org/img/wn/" + infos.weather[0].icon + "@2x.png";
});

// Tomorrow
ajaxGet("http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&APPID=0b0ebfd8043e4d1ca9870164f1abb64e", function (reponse) {
    
    // list[5] = 24h later
    var infos2 = JSON.parse(reponse);
    
    weatherTemp2Elt.innerHTML = "Expect temperature : " + Math.round(infos2.list[5].main.temp - 273) + "°C";
    
    weatherWind2Elt.innerHTML = "Wind speed : " + (infos2.list[5].wind.speed * 3,6) + " km/h.";
    
    weatherCloud2Elt.src = "http://openweathermap.org/img/wn/" + infos2.list[5].weather[0].icon + "@2x.png";
});




//All this only when you open the app ?



/* ================== Rating star App ==================== */


/* -------------------- Stars Rating ----------------- */
// Three time same => make a function ?

var ideaStarElts = document.querySelectorAll("[id^='idea-star']");
var designStarElts = document.querySelectorAll("[id^='design-star']");
var skillsStarElts = document.querySelectorAll("[id^='skills-star']");

var ideaRating = document.getElementById("idea-rating");
var designRating = document.getElementById("design-rating") ;
var skillsRating = document.getElementById("skills-rating") ;

for (var i = 0; i < ideaStarElts.length ; i ++) {
    
    ideaStarElts[i].addEventListener("click", clickOnIdeaStar);
}

for (var k = 0; k < designStarElts.length ; k ++) {
    
    designStarElts[k].addEventListener("click", clickOnDesignStar);
       
}

for (var l = 0; l < skillsStarElts.length ; l ++) {
    
    skillsStarElts[l].addEventListener("click", clickOnSkillsStar);
       
}


function clickOnIdeaStar(e) {
        
    var element = e.target.id;
    
    // Save the clicked star (to use when the form is send)
    ideaRating.value = element;
    
    // Color stars
    colorStars(element, ideaStarElts);
}
  
function clickOnDesignStar(e) {
        
    var element = e.target.id;
    
    // Save the clicked star (to use when the form is send)
    designRating.value = element;
    
    // Color stars
    colorStars(element, designStarElts);
}

function clickOnSkillsStar(e) {
        
    var element = e.target.id;
    
    // Save the clicked star (to use when the form is send)
    skillsRating.value = element;
    
    // Color stars
    colorStars(element, skillsStarElts);
}
    
function colorStars(element, elements) {
    
    var j = 0;
    
    while (elements[j].id !== element) {
        
        elements[j].innerHTML = "&#9733;" ;
        j++;
     } 
        
    // Color the clicked stars
    elements[j].innerHTML = "&#9733;" ;
    j++;
    
    // Uncolor the next stars
    while (j < elements.length) {
            
        elements[j].innerHTML = "&#9734;" ;
        j++;
    } 
        
}



/* ---------  Thank you message and submit form (EmailJs) ------------- */

var thankYouMsgElt = document.getElementById("thank-you-msg");
var sentMsgElt = document.getElementById("sent-msg");
var formELt = document.getElementById("rating-form");


formELt.addEventListener("submit", function(event) {

    event.preventDefault(); /* No refresh */
    /* Message appears */
    thankYouMsgElt.style.display = "block"; 
    // Form disappears
    this.style.display = "none";
    document.body.style.cursor = "wait";
    

    /* send form via EmailJs */
       
    emailjs.sendForm('default_service', 'rating_form', this)
    
        .then(function(response) {
           
            /* after success, regular cursor */
            document.body.style.cursor = "auto";
            sentMsgElt.style.display = "block";
            
        }, function(error) {
        
            /* Message if error */
            window.alert("Oups, something must be wrong here..");
        }); 

});

