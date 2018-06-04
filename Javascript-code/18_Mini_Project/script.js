const textAreaBorder = document.querySelector("#text-area");
const textArea = document.querySelector("#text-area");
const originalText = document.querySelector(".text-section-div p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = 0;
var currentTime = 0;
var minutes = 0;
var seconds = 0;
var milliSeconds = 0;
var interval = 0;
var timerRunning = false;

// Add leading zero to numbers 9 or below:
function leadingZero(time) {
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}


// Run a standard minute/second/hundredths timer:
//minutes = Math.floor((timer/100)/60);
//seconds = Math.floor((timer/100) - (minutes * 60));
//milliSeconds = Math.floor(timer- (seconds * 100) - (minutes * 6000));
function startTimer() {
    currentTime = leadingZero(minutes) + ":" + leadingZero(seconds) + ":" + leadingZero(milliSeconds);
    minutes = Math.floor((timer/100)/60);
    seconds = Math.floor((timer/100) - (minutes * 60));
    milliSeconds = Math.floor(timer- (seconds * 100) - (minutes * 6000));
    theTimer.innerHTML = currentTime;
    timer++;
}
// Match the text entered with the provided text on the page:
function spellCheck() {
    var textEntered = textArea.value;
    var textEnteredMatch = originalText.
    substring(0,textEntered.length);

    if(textEntered == originalText){
        clearInterval(interval);
        textAreaBorder.style.borderColor = "green";
    }
    else{
        if(textEntered == textEnteredMatch){
            textAreaBorder.style.borderColor = "blue";
        }else{
            textAreaBorder.style.borderColor = "red";
        }
    }
}

// Start the timer:
function start() {
    var textEnteredLength = textArea.value.length;
    if(textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(startTimer,10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = 0;
    currentTime = 0;
    minutes = 0;
    seconds = 0;
    milliSeconds = 0;
    interval = 0;
    timerRunning = false;
    theTimer.innerHTML = "00:00:00";
    textAreaBorder.style.borderColor = "gray";
    textArea.value = "";
}

// Event listeners for keyboard input and the reset button:
textArea.addEventListener("keypress",start,false);
textArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener("click",reset,false);