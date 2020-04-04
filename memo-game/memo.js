/* eslint-env es6 */
/* eslint-env browser */


/* =============== Memo-game js file ======================== */
// ============================================================
 


/* -------------------- Global variables ------------------- */

var level = 1;
var bestLevel = 1;
var expectedLetters = []; // Will contain random letters 
var userLetters = []; // Will contain user input
var timeToMemorize = 4800; // Time to display 3 letters on level 1





/* =================== Course of game  ======================== */


document.getElementById("ready-memorize-btn").addEventListener('click', function(){

    waitForIt();
    concentrationMsg();
    addBackground();
    
    generateLetters(level);
    showLetters();
    
    setTimeout(function(){
        
        goForIt();
        continueMsg();
        prepareInput();
        removeBackground();
        
        document.body.addEventListener('keypress', waitForUserInput);
        
    }, timeToMemorize);
});



/* --------------------- New Game --------------------------- */

document.getElementById("new-game-btn").addEventListener('click', function(){

    cleanArrays();
    cleanEventKeyboard();
    cleanMessages();
    unblockInput();
    
    welcomeMsg();
    
    level = 1;
    updateInfos();
});





/* ======================== Functions =========================== */


/* ------------------- Display letters ------------------------- */


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
   /* console.log(expectedLetters); // For development  */
}

function showLetters() {
    
    for (var i = 0; i < expectedLetters.length ; i++) {
        
        var content = expectedLetters[i][0];
        var id = "box" + expectedLetters[i][1];
        
        var time = i * 800; // Display letter every 800ms 
        
        showThisLetter(id, content, time);
    }
} 

function showThisLetter(id, content, time) {
    
    setTimeout(function(){
        document.getElementById(id).innerHTML = content;
    }, time);
    
    setTimeout(function(){
        document.getElementById(id).innerHTML = "";
    }, time + 2400); // Letter stays 2400ms
}



/* ------------------ user keyboard input ------------------ */

function waitForUserInput(event) {
            
    var userLetter = (String.fromCharCode(event.charCode)).toLowerCase();
    userLetters.push(userLetter);
    event.stopImmediatePropagation();
    
    showInput(userLetter);
            
    ifDefeat();
    ifSuccess();
    ifUltimateWin();
}




/* ------------------ Success / Defeat --------------------- */

function ifSuccess() {
    
    if(successLetter()) {
        goodLetterMsg();
    }
    
    if(successAll()) {
        successMsg();
        
        timeToMemorize += 800;
        level += 1;
        improvedRecord();
        updateInfos();
        
        cleanMessages();
        cleanArrays();
        cleanEventKeyboard();
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
        showAnswer();
        cleanEventKeyboard();
        removeGoForIt();
        blockInput();
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

function ifUltimateWin() {
    if(successAll() && (level === 15)) {
        ultimateWinMsg();
        
        level += 1;
        improvedRecord();
        updateInfos();
        
        cleanMessages();
        cleanArrays();
        cleanEventKeyboard();
        
        incredible();
    }
    
    else {
        return;
    }   
}




/* -------------------------- Informations --------------------- */

function waitForIt() {
    
    document.getElementById("ready-memorize-btn").style.display = "none";
    document.getElementById("wait-for-it").style.display = "block"; 
    
}

function goForIt() {
    
    document.getElementById("wait-for-it").style.display = "none";
    document.getElementById("go-for-it").style.display = "block"; 
    
}

function removeGoForIt() {
    
    document.getElementById("go-for-it").style.display = "none"; 
    //document.getElementById("just-type").style.display = "none"; 
    
}

function incredible() {
    
    document.getElementById("ready-to-memorize").style.display = "none";
    document.getElementById("incredible").style.display = "block"; 
    
}

function readyToMemorizeBtn() {
    
    document.getElementById("go-for-it").style.display = "none";
    document.getElementById("user-input").style.display = "none";
    document.getElementById("ready-memorize-btn").style.display = "block"; 
    
}

function prepareInput() {
    
    document.getElementById("user-input").style.display = "block";
}

function showInput(userLetter) {
    
    var input = document.getElementById("user-input");
    
    if (focusInput) {
        setTimeout(function() {
            input.value += " - ";
        }, 10);
    } else {
        input.value += userLetter + " - ";
    }
} 

function showAnswer() {
    
    answerMsg();
    
    var end = expectedLetters.length - 1;
    
    for (var i = 0 ; i < (end) ; i ++) {
        document.getElementById("answer-msg-letters").textContent += expectedLetters[i][0] + " - ";
    }
    
    document.getElementById("answer-msg-letters").textContent += expectedLetters[end][0];
    
}



/* ------------------------ Level / Record -------------------- */

function updateInfos() {
    
    document.getElementById("level-number").innerHTML = level;
    document.getElementById("best-level-number").innerHTML = bestLevel; 
    
}

function improvedRecord() {
    if (level > bestLevel) {
        bestLevel = level;
    }
}



/* -------------------- Re-initialize ----------------------- */

function cleanArrays() {
    
    expectedLetters = [];
    userLetters = [];
    
}

function cleanMessages() {
    
    readyToMemorizeBtn();
    
    document.getElementById("user-input").value = "";
    document.getElementById("answer-msg-letters").innerHTML = "";

    document.getElementById("continue-msg").style.display = "none"; 
    document.getElementById("go-for-it").style.display = "none"; 
}

function cleanEventKeyboard() {
    
    document.body.removeEventListener('keypress', waitForUserInput);
    
}

function blockInput() {
    document.getElementById("user-input").setAttribute("disabled", "disabled");
    document.getElementById("user-input").blur();
}

function unblockInput() {
    document.getElementById("user-input").removeAttribute("disabled");
}




/* ----------------------- Messages ----------------------- */


function welcomeMsg() {
    
    document.getElementById("success-msg").style.display = "none";
    document.getElementById("defeat-msg").style.display = "none";
    document.getElementById("answer-msg").style.display = "none";
    
    document.getElementById("welcome-msg").style.display = "block";  
}

function concentrationMsg() {
    
    document.getElementById("success-msg").style.display = "none";
    document.getElementById("defeat-msg").style.display = "none";
    document.getElementById("answer-msg").style.display = "none";
    document.getElementById("welcome-msg").style.display = "none";
    
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

function answerMsg() {

    document.getElementById("answer-msg").style.display = "block"; 
    
}

function ultimateWinMsg() {
    
    document.getElementById("continue-msg").style.display = "none";
    document.getElementById("ultimate-win-msg").style.display = "block";     
}



/* ------------------ Visual effects ------------------------ */


function addBackground() {
    
    document.getElementById("letters-bloc").style.backgroundColor = "white";
    document.getElementById("letters-bloc").style.borderColor = "#a8a6a4";
    
}

function removeBackground() {
    
    document.getElementById("letters-bloc").style.backgroundColor = "rgba(0,0,0,0)";
    document.getElementById("letters-bloc").style.borderColor = "rgba(0,0,0,0)";
    
}



/* ------- Need to know if there is a focus on input or directly type in keyboard ------- */

var focusInput = false;

document.getElementById("user-input").addEventListener("focus", function() {
    focusInput = true;
});
document.getElementById("user-input").addEventListener("blur", function() {
    focusInput = false;
});
