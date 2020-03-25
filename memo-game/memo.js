/* eslint-env es6 */
/* eslint-env browser */


/* =============== Memo-game js file ================== */
// ======================================================



/* Global variables */

var level = 1;
var expectedLetters = []; // Will contain random letters 
var userLetters = []; // Will contain user input
var timeToMemorize = 4800; // Time to display 3 letters on level 1



/* ========== Course of game  =============== */

document.getElementById("ready-memorize-btn").addEventListener('click', function(){

    waitForIt();
    concentrationMsg();
    
    generateLetters(level);
    showLetters();
    
    setTimeout(function(){
        
        goForIt();
        continueMsg();
        
        document.body.addEventListener('keypress', waitForUserInput);
        
    }, timeToMemorize);
});


/* ========== functions =============== */

/* ------ Display letters -------- */

function generateLetters(level) {
    
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    var emptyBox = ['true', 'true', 'true', 'true', 'true', 'true', 'true', 'true', 'true', 'true', 'true', 'true', 'true', 'true', 'true', 'true', 'true', 'true'];
    
    for (var i = 0 ; i < (level + 2) ; i ++) {
        var aleaLetter = Math.floor(Math.random()*26);
        
        var aleaBox = Math.floor(Math.random()*18) + 1;
        while (emptyBox[aleaBox] === false) {
            aleaBox = Math.floor(Math.random()*18) + 1;
        }
        emptyBox[aleaBox] = false;
        expectedLetters.push([alphabet[aleaLetter], aleaBox]);
    }
    console.log(expectedLetters);
}

function showLetters() {
    for (var i = 0; i < expectedLetters.length ; i++) {
        var content = expectedLetters[i][0];
        var id = "box" + expectedLetters[i][1];
        var time = i * 800;
        showThisLetter(id, content, time);
    }
} 

function showThisLetter(id, content, time) {
    setTimeout(function(){
        document.getElementById(id).innerHTML = content;
    }, time);
    setTimeout(function(){
        document.getElementById(id).innerHTML = "";
    }, time + 2400);
}

/* -------------- */


/* ------ Success / Defeat -------- */

function ifSuccess() {
    if(successLetter()) {
        goodLetterMsg();
    }
    if(successAll()) {
        successMsg();
        level += 1;
        updateInfos();
        cleanMessages();
        cleanArrays();
        cleanEvent();
    }
    else {
        return;
    }
}

function successLetter() {
    var i = userLetters.length - 1;
    if (userLetters[i] === expectedLetters[i][0]) {
        return true;
    } else {
        return false;
    }    
}

function successAll() {
    for (var i = 0; i < expectedLetters.length ; i++) {
        if (userLetters[i] !== expectedLetters[i][0]) {
            return false;
        }
    }
    return true;
}

function ifDefeat() {
    if(defeat()) {
        defeatMsg();
    }
    else {
        return;
    }   
}

function defeat() {
    var i = userLetters.length - 1;
    if (userLetters[i] !== expectedLetters[i][0]) {
        return true;
    } else {
        return false;
    }    
}


/* ------ Informations -------- */

function waitForIt() {
    document.getElementById("ready-memorize-btn").style.display = "none";
    document.getElementById("wait-for-it").style.display = "block"; 
}

function goForIt() {
    document.getElementById("wait-for-it").style.display = "none";
    document.getElementById("go-for-it").style.display = "block"; 
}

function readyToMemorizeBtn() {
    document.getElementById("go-for-it").style.display = "none";
    document.getElementById("user-input").style.display = "none";
    document.getElementById("ready-memorize-btn").style.display = "block"; 
}

function showInput(userLetter) {
    document.getElementById("user-input").style.display = "block";
    document.getElementById("user-input-letter").textContent += userLetter + " - ";
}


/* ------ Level / Record -------- */

function updateInfos() {
    document.getElementById("level-number").innerHTML = level;
    document.getElementById("best-level-number").innerHTML = level; 
}


/* ------ Re initialize -------- */

function cleanArrays() {
    expectedLetters = [];
    userLetters = [];
}

function cleanMessages() {
    readyToMemorizeBtn();
    document.getElementById("user-input-letter").innerHTML = "";
}

function cleanEvent() {
    document.body.removeEventListener('keypress', waitForUserInput);
}


/* ------- Messages ------- */

function concentrationMsg() {
    document.getElementById("welcome-msg").style.display = "none";
    document.getElementById("success-msg").style.display = "none";
    document.getElementById("concentration-msg").style.display = "block";    
}

function continueMsg() {
    document.getElementById("concentration-msg").style.display = "none";
    document.getElementById("continue-msg").style.display = "block";     
}

function goodLetterMsg() {
    document.getElementById("good-letter-msg").style.display = "block";
        setTimeout(function(){
        document.getElementById("good-letter-msg").style.display = "none";
    }, 400);
}

function successMsg() {
    document.getElementById("continue-msg").style.display = "none";
    document.getElementById("success-msg").style.display = "block";     
}

function defeatMsg() {
    document.getElementById("continue-msg").style.display = "none";
    document.getElementById("defeat-msg").style.display = "block";     
}

function waitForUserInput(event) {
            
    var userLetter = String.fromCharCode(event.charCode);
    userLetters.push(userLetter);
    event.stopImmediatePropagation();

    showInput(userLetter);
            
    ifDefeat();
    ifSuccess();    
}