/* eslint-env es6 */
/* eslint-env browser */




/* ================== Main js file ============= */

 


/* ------ Initializing -------- */

var activeAppId = "";
var activeBoxId = "";

var boxIsOpen = false;
var tinyVue = window.matchMedia("(max-width: 785px)"); 


// Allow click Event on each app for the first time

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
   
    if (e.target.className === "close-btn") {
        // Go out if close button clicked
    } else {
        
        /* Cancel if click is on the box or on one of his children : not so good, but no better idea than test all levels of parent node */
        
        while (target.id !== "main") {
            if (target === activeBox) {
                return;
            } else {
                target = target.parentElement;
            }
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


/* --------- Link number 3 - Id card --------------- */


// :hover on link-number3 -> display id card 

var idCardOpen = false;

document.getElementById("link-number3").addEventListener("mouseover", function() {
    document.getElementById("id-card").style.display = "block";
    idCardOpen = true;
});

document.getElementById("link-number3").addEventListener("mouseout", function() {
    document.getElementById("id-card").style.display = "none";
    idCardOpen = false;
});

//Issue on mobile with :hover -> ID card appears when you click on and do not disappears. So add a click event

document.getElementById("link-number3").addEventListener("click", function() {
    if (!idCardOpen) {
        idCardOpen = true;
        document.getElementById("id-card").style.display = "block";
    } else {
        idCardOpen = false;
        document.getElementById("id-card").style.display = "none";
    }
});


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
    
    weatherTempElt.innerHTML = Math.round(infos.main.temp - 273) + "°C";
    
    weatherWindElt.innerHTML = (Math.round(infos.wind.speed * 3.6)) + " km/h.";
    
    weatherCloudElt.src = "http://openweathermap.org/img/wn/" + infos.weather[0].icon + "@2x.png";
});

// Tomorrow
ajaxGet("http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&APPID=0b0ebfd8043e4d1ca9870164f1abb64e", function (reponse) {
    
    // list[5] = 24h later
    var infos2 = JSON.parse(reponse);
    var weatherWind2Elt = document.getElementById("weather-wind2");
    var weatherTemp2Elt = document.getElementById("weather-temp2");
    var weatherCloud2Elt = document.getElementById("weather-cloud2");
    
    
    weatherTemp2Elt.innerHTML = Math.round(infos2.list[5].main.temp - 273) + "°C";
    
    weatherWind2Elt.innerHTML = (Math.round(infos2.list[5].wind.speed * 3.6)) + " km/h.";
    
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
var answer1 = "Full-time Part-time" ;
var answer2 = "Tell me!" ;
var answer3 = "Employee Intern Other" ;
var access = "english";

function scriptApp5() {
    
    interval = setInterval(questionAnswer, 2000);   
}

function questionAnswer() {

    var bubbleElt = document.getElementById("bubble");
    var answerElt = document.getElementById("answer");
    
    
    bubbleElt.style.backgroundImage = "url('images/" + access + "/question" + currentQuestion + ".png')";

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
    
    document.getElementById("wallpaper-btn").addEventListener("mouseover", openWallpaper);
    
    document.getElementById("language-btn").addEventListener("mouseover", openLanguage);
    
    changeWallpaper();
    
    changeLanguage();
    
}

function openWallpaper() {
    
    clearSetting();
    
    document.getElementById("wallpaper").style.display = "flex";
    
    clearButton();
    
    document.getElementById("wallpaper-btn").className += " active";
    
}

function openLanguage() {
    
    clearSetting();
    
    document.getElementById("language").style.display = "flex";
    
    clearButton();
    
    document.getElementById("language-btn").className += " active";
}

function clearSetting() {
    
    document.getElementById("wallpaper").style.display = "none";
    document.getElementById("language").style.display = "none";
    
}

function clearButton() {
    
    var btn1 = document.getElementById("wallpaper-btn");
    var btn2 = document.getElementById("language-btn");
    
    btn1.className = btn1.className.replace(" active", "");
    btn2.className = btn2.className.replace(" active", "");
}

function changeWallpaper() {
    
    document.getElementById("stockholm1").addEventListener("change", function() {
        document.getElementById("smartphone-screen").style.backgroundImage = "url('images/screen/stockholm1.jpg')";
    });
    
    document.getElementById("stockholm2").addEventListener("change", function() {
        document.getElementById("smartphone-screen").style.backgroundImage = "url('images/screen/stockholm2.jpg')";
    });
    
    document.getElementById("stockholm3").addEventListener("change", function() {
        document.getElementById("smartphone-screen").style.backgroundImage = "url('images/screen/stockholm3.jpg')";
    });
    
    document.getElementById("stockholm4").addEventListener("change", function() {
        document.getElementById("smartphone-screen").style.backgroundImage = "url('images/screen/stockholm4.jpg')";
    });
}

function changeLanguage() {
    
    document.getElementById("english-flag").addEventListener("change", function() {
        goEnglish();
    });
    
    document.getElementById("swedish-flag").addEventListener("change", function() {
        goSvenska();
    });
    
    document.getElementById("french-flag").addEventListener("change", function() {
        goFrancais();
    });
    
}

// Too heavy ? don't want refresh page. Better use React ? Can't change all now. Next time!

function goEnglish() {
    
    /* background-image */
    document.getElementById("main").style.backgroundImage = "url('images/main/background-en.png')";
    
    /* header */
    document.getElementById("title").innerHTML = "Jérémy Lavigne, Front-End Developer";
    
    /* footer */
    document.getElementById("change-footer1").innerHTML = "Images from";
    document.getElementById("change-footer2").innerHTML = "Build by";
    document.getElementById("change-footer3").innerHTML = "Icons from";
    
    /* App 1 */
    document.getElementById("app1-title").innerHTML = "Video - Resume";
    
    /* App 2 */
    document.getElementById("app2-title").innerHTML = "Website - Survey / FAQ / Form";
    
    /* App 3 */
    document.getElementById("app3-title").innerHTML = "Weather";
    document.getElementById("today-title").innerHTML = "Today";
    document.getElementById("tomorrow-title").innerHTML = "Tomorrow";
    document.getElementById("change-weather1").innerHTML = "Current temperature : ";
    document.getElementById("change-weather2").innerHTML = "Wind speed : ";
    document.getElementById("change-weather3").innerHTML = "Expected temperature : ";
    document.getElementById("change-weather4").innerHTML = "Wind speed : ";
    
    /* App 4 */
    document.getElementById("app4-title").innerHTML = "Game - Test your memory";
    
    /* App 5 */
    document.getElementById("app5-title").innerHTML = "Conditions";
    answer1 = "Full-time Part-time" ;
    answer2 = "Tell me!" ;
    answer3 = "Employee Intern Other" ;
    access = "english";
    
    /* App 6 */
    document.getElementById("app6-title").innerHTML = "Game - Make a pizza";
    
    /* App 7 */
    document.getElementById("app7-title").innerHTML = "Settings";
    document.getElementById("wallpaper-btn").innerHTML = "Wallpaper";
    document.getElementById("language-btn").innerHTML = "Language";
    
    /* App 8 */
    document.getElementById("app8-title").innerHTML = "Website - Version 1";    
    
    /* App 9 */
    document.getElementById("app9-title").innerHTML = "Rate this website";
    document.getElementById("thank-you-msg").innerHTML = "Thank you very much ;)";
    document.getElementById("change-form1").innerHTML = "Idea";
    document.getElementById("change-form2").innerHTML = "Design";
    document.getElementById("change-form3").innerHTML = "Skills";
    document.getElementById("user-advice").placeholder = "Any advice? (optional)";
    document.getElementById("sendbutton").innerHTML = "Send";
    
    /* ID-card */
    document.getElementById("change-id1").innerHTML = "Name : Jeremy Lavigne ";
    document.getElementById("change-id2").innerHTML = "Age : 30";
    document.getElementById("change-id3").innerHTML = "French, ";
    document.getElementById("change-id4").innerHTML = "Settled in Stockholm since 2019 ";
}

function goSvenska() {
    
    /* background-image */
    document.getElementById("main").style.backgroundImage = "url('images/main/background-sv.png')";
    
    /* header */
    document.getElementById("title").innerHTML = "Jérémy Lavigne, Front-End Utvecklare";
    
    /* footer */
    document.getElementById("change-footer1").innerHTML = "Bilder från";
    document.getElementById("change-footer2").innerHTML = "Gjord av";
    document.getElementById("change-footer3").innerHTML = "Ikoner från";
    
    /* App 1 */
    document.getElementById("app1-title").innerHTML = "Video - CV";
    
    /* App 2 */
    document.getElementById("app2-title").innerHTML = "Webbplats - undersökning / vanliga frågor / formulär";
    
    /* App 3 */
    document.getElementById("app3-title").innerHTML = "Väder";
    document.getElementById("today-title").innerHTML = "I dag";
    document.getElementById("tomorrow-title").innerHTML = "I Morgon";
    document.getElementById("change-weather1").innerHTML = "Aktuell temperatur : ";
    document.getElementById("change-weather2").innerHTML = "Vindhastighet : ";
    document.getElementById("change-weather3").innerHTML = "Förväntad temperatur : ";
    document.getElementById("change-weather4").innerHTML = "Vindhastighet : ";

    /* App 4 */
    document.getElementById("app4-title").innerHTML = "Spel - Testa ditt minne";
    
    /* App 5 */
    document.getElementById("app5-title").innerHTML = "Termer";
    answer1 = "Heltid Deltid" ;
    answer2 = "Berätta för mig !" ;
    answer3 = "Anställd Praktikant Annat" ;
    access = "svenska";
    
    /* App 6 */
    document.getElementById("app6-title").innerHTML = "Spel - Gör en pizza";
    
    /* App 7 */
    document.getElementById("app7-title").innerHTML = "Inställningar";
    document.getElementById("wallpaper-btn").innerHTML = "Tapet";
    document.getElementById("language-btn").innerHTML = "Språk";
    
    /* App 8 */
    document.getElementById("app8-title").innerHTML = "Hemsida - Version 1";
    
    /* App 9 */
    document.getElementById("app9-title").innerHTML = "Betygsätt denna webbplats";
    document.getElementById("thank-you-msg").innerHTML = "Tack så mycket ;)";
    document.getElementById("change-form1").innerHTML = "Idé";
    document.getElementById("change-form2").innerHTML = "Design";
    document.getElementById("change-form3").innerHTML = "Teknisk";
    document.getElementById("user-advice").placeholder = "Några råd? (valfritt)";
    document.getElementById("sendbutton").innerHTML = "Skicka";
    
    /* ID-card */
    document.getElementById("change-id1").innerHTML = "Namn : Jeremy Lavigne ";
    document.getElementById("change-id2").innerHTML = "ålder : 30";
    document.getElementById("change-id3").innerHTML = "Fransk, ";
    document.getElementById("change-id4").innerHTML = "Bosatt i Stockholm sedan 2019 ";
}

function goFrancais() {
    
    /* background-image */
    document.getElementById("main").style.backgroundImage = "url('images/main/background-fr.png')";
    
    /* header */
    document.getElementById("title").innerHTML = "Jérémy Lavigne, Developpeur Front-End";
    
    /* footer */
    document.getElementById("change-footer1").innerHTML = "Images par";
    document.getElementById("change-footer2").innerHTML = "Réalisé par";
    document.getElementById("change-footer3").innerHTML = "Icones par";
    
    /* App 1 */
    document.getElementById("app1-title").innerHTML = "Video - CV";
    
    /* App 2 */
    document.getElementById("app2-title").innerHTML = "Site Web - Questionnaire / FAQ / Formulaire";
    
    /* App 3 */
    document.getElementById("app3-title").innerHTML = "Météo";
    document.getElementById("today-title").innerHTML = "Aujourd'hui";
    document.getElementById("tomorrow-title").innerHTML = "Demain";
    document.getElementById("change-weather1").innerHTML = "Temperature actuelle : ";
    document.getElementById("change-weather2").innerHTML = "Vitesse du vent : ";
    document.getElementById("change-weather3").innerHTML = "Temperature attendue : ";
    document.getElementById("change-weather4").innerHTML = "vitesse du vent : ";

    /* App 4 */
    document.getElementById("app4-title").innerHTML = "Jeu - Testez votre mémoire";
    
    /* App 5 */
    document.getElementById("app5-title").innerHTML = "Conditions";
    answer1 = "Plein, Partiel" ;
    answer2 = "Dites moi!" ;
    answer3 = "Employé Stagiaire Autre" ;
    access = "fr";
    
    /* App 6 */
    document.getElementById("app6-title").innerHTML = "Jeu - Faites votre pizza";
    
    /* App 7 */
    document.getElementById("app7-title").innerHTML = "Réglages";
    document.getElementById("wallpaper-btn").innerHTML = "Fond écran";
    document.getElementById("language-btn").innerHTML = "Langue";
    
    /* App 8 */
    document.getElementById("app8-title").innerHTML = "Site Web - Version 1";
    
    /* App 9 */
    document.getElementById("app9-title").innerHTML = "Notez ce site";
    document.getElementById("thank-you-msg").innerHTML = "Merci beaucoup ;)";
    document.getElementById("change-form1").innerHTML = "Idée";
    document.getElementById("change-form2").innerHTML = "Design";
    document.getElementById("change-form3").innerHTML = "Technique";
    document.getElementById("user-advice").placeholder = "Un conseil? (optionnel)";
    document.getElementById("sendbutton").innerHTML = "Envoyer";
    
    /* ID-card */
    document.getElementById("change-id1").innerHTML = "Nom : Jeremy Lavigne ";
    document.getElementById("change-id2").innerHTML = "Age : 30";
    document.getElementById("change-id3").innerHTML = "Français, ";
    document.getElementById("change-id4").innerHTML = "Installé à Stockholm depuis 2019";
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
