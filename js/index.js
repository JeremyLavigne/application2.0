/* eslint-env es6 */
/* eslint-env browser */

/* ================== main website js file ============= */

/* ------ Global variables -------- */

var activeAppId = "";
var activeBoxId = "";
var tinyVue = window.matchMedia("(max-width: 785px)"); 
var boxIsOpen = false;

// allow click Event on each app for the first time

allowOpenOthers();

// Listener if media change when some box is already open

tinyVue.addListener(isTinyVueWhenBoxOpened);


/* ------ Event click on any app -------- */

function openApp(e) {
    
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


/* ----------- display app ----------- */

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



/* ------ Event click outside (when app is open) -------- */

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
            
    }, 1000);
}



/* ----------- hide app ----------- */

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


/* --------- Responsive part --------------- */

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
