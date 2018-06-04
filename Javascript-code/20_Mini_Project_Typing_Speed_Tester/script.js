const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var currentTime;
var timer = 0;
var minutes = 0;
var seconds = 0;
var milliSeconds = 0;
var interval = 0;
var timerRunning = false;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    currentTime = leadingZero(minutes) + ":" + leadingZero(seconds) + ":" + leadingZero(milliSeconds);
    theTimer.innerHTML = currentTime;
    timer++;

    minutes = Math.floor((timer/100)/60);
    seconds = Math.floor((timer/100) - (minutes * 60));
    milliSeconds = Math.floor(timer- (seconds * 100) - (minutes * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    var textEntered = testArea.value;
    var originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered === originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "forestgreen";
    } else {
        if (textEntered === originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "red";
        }
    }
}

// Start the timer:
function start() {
    var textEnteredLength = testArea.value.length;
    if(textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer,10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = 0;
    minutes = 0;
    seconds = 0;
    milliSeconds = 0;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "gray";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellCheck,false);
resetButton.addEventListener("click",reset,false);