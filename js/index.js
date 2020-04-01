/* eslint-env es6 */
/* eslint-env browser */




/* ================== Main js file ============= */




/* ------ Initializing -------- */

var activeAppId = "";
var activeBoxId = "";

var boxIsOpen = false;
var tinyVue = window.matchMedia("(max-width: 785px)"); 


// allow click Event on each app for the first time

allowOpenOthers();

// Listener if media change when some box is already open

tinyVue.addListener(isTinyVueWhenBoxOpened);




/* ------ Event click on one app (icon) -------- */

function openApp(e) {
    
    /* particular traitment for some apps */
    switch (e.currentTarget.id) {
        case ("app-number1"):
            scriptApp1();
            break;
        
        case ("app-number3"):
            scriptApp3();
            break;
            
        case ("app-number5"):
            scriptApp5();
            break;
            
        case ("app-number7"):
            scriptApp7();
            break;
            
        case ("app-number9"):
            scriptApp9();
            break;
            
        default:
    }
    
    /* remove poosibity to open others apps */
    removeOpenOthers();
    
    getBoxId(e.currentTarget);

    iconAnimation(e.currentTarget);
    
    /* time for (1) avoid a conflict between to click event (shut and open in the same time) and (2) let animation plays */
    
    setTimeout(function(){

        /* Hide smartphone if width is not enough */
        if (isTinyVue()) {
            document.getElementById("smartphone").style.display = "none";
        }
        
        boxAnimation();
        
        boxIsOpen = true;
        
        document.body.addEventListener('click', everywhereExceptHere);  
        
    }, 800);
    
}

function getBoxId(target) {
    var letters = target.id.split('');
    var end = letters.length - 1;
    activeBoxId = "app-box-number" + letters[end];
}


/* ----------- Display Box app ----------- */

function removeOpenOthers() {
    
    for (var i = 1 ; i < 10 ; i ++) {
        var id = "app-number" + i;
        document.getElementById(id).removeEventListener('click', openApp);
    }
}

function iconAnimation(target) {
    
    activeAppId = target.id;
    
    target.style.animation = "hideIcon 1s forwards";
    
}

function boxAnimation() {
    
    document.getElementById(activeBoxId).style.animation = "showBox 1.5s forwards";
    document.getElementById(activeBoxId).style.display = "flex";
    document.getElementById("opened-app").style.display = "block";
    
}



/* ------ Event click outside - to close (when app is open) -------- */

function everywhereExceptHere(e) {
    
    var target = e.target;
    var activeBox = document.getElementById(activeBoxId);
   
    /* Cancel if click is on the box or on one of his children : not so good, but no better idea than test all levels of parent node */
    
    while (target.id !== "main") {
        if (target === activeBox) {
            return;
        } else {
            target = target.parentElement;
        }
    }
    
  
    hideBoxAnimation();
        
    /* Time (1) to avoid conflict when you go out with a click on the same app (2) let animation */
        
    setTimeout(function(){
            
        boxIsOpen = false; 
        
        /* If smartphone was hidden because of @media, get it back now */
        document.getElementById("smartphone").style.display = "flex";
            
        allowOpenOthers();
        iconBackAnimation();
            
        document.body.removeEventListener('click', everywhereExceptHere);  
        
        /* particular traitment for some apps */
        switch (activeBoxId) {
            case ("app-box-number1"):
                pauseVideo();
                break;
            case ("app-box-number5"):
                clearInterval(interval);
                break;
            default:
        }
            
    }, 1000);
}



/* ----------- Hide Box app ----------- */

function allowOpenOthers() {
    
    for (var i = 1 ; i < 10 ; i ++) {
        var id = "app-number" + i;
        document.getElementById(id).addEventListener('click', openApp);
    }
}
 
function iconBackAnimation() {
    
    var activeApp = document.getElementById(activeAppId);

    activeApp.style.animation = "showIcon 1s forwards";  
    
    setTimeout(function() {
        activeApp.style.animation = "";   
    }, 1000);
}  

function hideBoxAnimation() {
    
    document.getElementById(activeBoxId).style.animation = "hideBox 1s";
    setTimeout( function() {
        
        document.getElementById("opened-app").style.display = "none";
        document.getElementById(activeBoxId).style.display = "none";
        
    }, 900);
    
}


/* --------- Responsive part - open/close --------------- */

function isTinyVue() { // if app is open when little width

    if (document.body.clientWidth < 785 ) { 
        return true;
    } else {
        return false;   
    }
}
   
function isTinyVueWhenBoxOpened() { 
    
    if (boxIsOpen) {
        
        if (tinyVue.matches) { 
            document.getElementById("smartphone").style.display = "none";
        } else {
            document.getElementById("smartphone").style.display = "flex";  
        }
    }
} 











/* ======================== App js code ========================== */


/* --------- App number 1 - Video --------------- */

function scriptApp1() {
    
    var videoElt = document.getElementById("scratch-video");
    
    videoElt.load();
    
}

function pauseVideo() {
    
    var videoElt = document.getElementById("scratch-video");
    
    videoElt.pause();
    
}



/* --------- App number 3 - Weather --------------- */

function scriptApp3() {
    
    // Get datas on api.openweathermap.org

// Today
ajaxGet("http://api.openweathermap.org/data/2.5/weather?q=Stockholm&APPID=0b0ebfd8043e4d1ca9870164f1abb64e", function (reponse) {
    
    // 
    var infos = JSON.parse(reponse);
    var weatherNameElt = document.getElementById("weather-name");
    var weatherWindElt = document.getElementById("weather-wind");
    var weatherTempElt = document.getElementById("weather-temp");
    var weatherCloudElt = document.getElementById("weather-cloud");
    
    
    weatherNameElt.innerHTML = infos.name;
    
    weatherTempElt.innerHTML = "Actual temperature : " + Math.round(infos.main.temp - 273) + "°C";
    
    weatherWindElt.innerHTML = "Wind speed : " + (Math.round(infos.wind.speed * 3.6)) + " km/h.";
    
    weatherCloudElt.src = "http://openweathermap.org/img/wn/" + infos.weather[0].icon + "@2x.png";
});

// Tomorrow
ajaxGet("http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&APPID=0b0ebfd8043e4d1ca9870164f1abb64e", function (reponse) {
    
    // list[5] = 24h later
    var infos2 = JSON.parse(reponse);
    var weatherWind2Elt = document.getElementById("weather-wind2");
    var weatherTemp2Elt = document.getElementById("weather-temp2");
    var weatherCloud2Elt = document.getElementById("weather-cloud2");
    
    
    weatherTemp2Elt.innerHTML = "Expect temperature : " + Math.round(infos2.list[5].main.temp - 273) + "°C";
    
    weatherWind2Elt.innerHTML = "Wind speed : " + (Math.round(infos2.list[5].wind.speed * 3.6)) + " km/h.";
    
    weatherCloud2Elt.src = "http://openweathermap.org/img/wn/" + infos2.list[5].weather[0].icon + "@2x.png";
});

    
}

function ajaxGet(url, callback) {
        
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {

            callback(req.responseText);
        } else {
            
           // console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        
        //console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}



/* --------- App number 5 - Conditions --------------- */

var interval = ""; 
var currentQuestion = 1; 

function scriptApp5() {
    
    interval = setInterval(questionAnswer, 2000);   
}

function questionAnswer() {

    var answer1 = "Full-time Part-time" ;
    var answer2 = "Tell me!" ;
    var answer3 = "Employee Intern Other" ;

    var bubbleElt = document.getElementById("bubble");
    var answerElt = document.getElementById("answer");
    
    
    bubbleElt.style.backgroundImage = "url('images/question" + currentQuestion + ".png')";

    switch (currentQuestion) {
        case 1 : 
            answerElt.textContent = answer1;
            answerElt.style.fontSize = "1.4em";
            bubbleElt.style.backgroundPosition = "left";
            break;

        case 2:
            answerElt.textContent = answer2;
            answerElt.style.fontSize = "1.8em";
            bubbleElt.style.backgroundPosition = "top";
            break;     

        case 3:
            answerElt.textContent = answer3;
            answerElt.style.fontSize = "1.2em";
            bubbleElt.style.backgroundPosition = "right";
            break;  

        default : 
    }

    currentQuestion ++ ;
    if (currentQuestion === 4) {
        currentQuestion = 1;
    }
}




/* --------- App number 7 - Setting --------------- */

function scriptApp7() {

    
}




/* --------- App number 9 - Rating --------------- */

function scriptApp9() {
 
    var ideaStarElts = document.querySelectorAll("[id^='idea-star']");
    var designStarElts = document.querySelectorAll("[id^='design-star']");
    var skillsStarElts = document.querySelectorAll("[id^='skills-star']");

    for (var i = 0; i < ideaStarElts.length ; i ++) {
    
        ideaStarElts[i].addEventListener("click", clickOnIdeaStar);
    }

    for (var k = 0; k < designStarElts.length ; k ++) {

        designStarElts[k].addEventListener("click", clickOnDesignStar);

    }

    for (var l = 0; l < skillsStarElts.length ; l ++) {

        skillsStarElts[l].addEventListener("click", clickOnSkillsStar);

    }
    
    sendingForm();
    
}

function clickOnIdeaStar(e) {
        
    var element = e.target.id;
    var ideaRating = document.getElementById("idea-rating");
    var ideaStarElts = document.querySelectorAll("[id^='idea-star']");
    
    // Save the clicked star (to use when the form is send)
    ideaRating.value = element;
    
    // Color stars
    colorStars(element, ideaStarElts);
}
  
function clickOnDesignStar(e) {
        
    var element = e.target.id;
    var designRating = document.getElementById("design-rating") ;
    var designStarElts = document.querySelectorAll("[id^='design-star']");
    
    // Save the clicked star (to use when the form is send)
    designRating.value = element;
    
    // Color stars
    colorStars(element, designStarElts);
}

function clickOnSkillsStar(e) {
        
    var element = e.target.id;
    var skillsRating = document.getElementById("skills-rating") ;
    var skillsStarElts = document.querySelectorAll("[id^='skills-star']");
    
    // Save the clicked star (to use when the form is send)
    skillsRating.value = element;
    
    // Color stars
    colorStars(element, skillsStarElts);
}
    
function colorStars(element, elements) {
    
    var j = 0;
    
    // Color the previous stars
    while (elements[j].id !== element) {
        
        elements[j].innerHTML = "&#9733;" ;
        j++;
     } 
        
    // Color the clicked star
    elements[j].innerHTML = "&#9733;" ;
    j++;
    
    // Uncolor the next stars
    while (j < elements.length) {
            
        elements[j].innerHTML = "&#9734;" ;
        j++;
    } 
        
}

function sendingForm() {
    
    var thankYouMsgElt = document.getElementById("thank-you-msg");
    var sentMsgElt = document.getElementById("sent-msg");
    var formELt = document.getElementById("rating-form");


    formELt.addEventListener("submit", function(event) {

        event.preventDefault(); // No refresh 
        
        // Message appears 
        thankYouMsgElt.style.display = "block"; 
        
        // Form disappears and wait cursor
        this.style.display = "none";
        document.body.style.cursor = "wait";


/* eslint-disable */
/* jshint ignore:start */
        
        /* ------- Send form via EmailJs ------ */
        
        emailjs.sendForm('default_service', 'rating_form', this)

            .then(function(response) {

                //console.log('SUCCESS!', response.status, response.text);
            
                // after success, regular cursor and check mark
                document.body.style.cursor = "auto";
                sentMsgElt.style.display = "block";

            }, function(error) {
                
                //console.log('FAILED...', error);
            
                window.alert("Oups, something must be wrong here..");
            }); 
/* eslint-enable */
/* jshint ignore:end */
    });

}
