var cifras = document.getElementById("cifras");
var resultado = document.getElementById("resultado");
var initial = 0;
var finalresult = 0;
var rotatingColors = ["red", "blue", "green", "purple"]; // Updated colors
var maximumValue = 15;
var delayTime = 0.5;
var numberOfValues = 4;
var increaseSpeed = false;
var increaseSequence = false;
var valuesToDisplay = [];
var mal = 0;
var bien = 0;
var valor = 4;
var buenas = document.getElementById("buenas");
var malas = document.getElementById("malas");
var valores = document.getElementById("valores");
var velocidad = document.getElementById("velocidad");
var botonBuenas = document.getElementById("botonBuenas");
var botonMalas = document.getElementById("botonMalas");
var beepSound = new Audio('audio/beep_short.mp3');
velocidad.innerHTML = delayTime;

function displayWithDelay(values, delay, callback) {
    var i = 0;
    function showNextValue() {
        if (i < values.length) {
            cifras.innerText = values[i];

            // Assign colors based on position
            if (i < 3) {
                cifras.style.color = "grey"; // First three always grey
            } else if (i === values.length - 1) {
                cifras.style.color = "black"; // Last one always black
            } else {
                cifras.style.color = rotatingColors[(i - 3) % rotatingColors.length]; // Rotate through colors
                beepSound.currentTime = 0; // Restart the sound if it's already playing
                beepSound.play();
            }



            i++;
            setTimeout(showNextValue, delay);
        } else if (callback) {
            callback();
        }
    }
    showNextValue();
}

function generateSequence(numberOfValues) {
    valuesToDisplay = [".", "..", "..."];
    let currentresult = getRandomInt(1, maximumValue);
    valuesToDisplay.push(currentresult);

    for (let i = 1; i < numberOfValues; i++) {
        let nextValue = getRandomInt(currentresult * -1, maximumValue - currentresult);
        if (nextValue === 0) {
            nextValue = nextValue - 1;
        }
        currentresult += nextValue;

        if (currentresult < 0) {
            currentresult = 0;
        }

        valuesToDisplay.push(nextValue);
    }

    finalresult = currentresult;
    valuesToDisplay.push('R=');
    displayWithDelay(valuesToDisplay, delayTime * 1000);
}

function todo() {
    // Always update numberOfValues from the input field
    numberOfValues = parseInt(document.getElementById("numCount").value);
    maximumValue = parseInt(document.getElementById("maxValue").value);
    delayTime = parseFloat(document.getElementById("delay").value);

    increaseSpeed = document.getElementById("increaseSpeed").checked;
    increaseSequence = document.getElementById("increaseSequence").checked;

    resultado.innerHTML = " ";
    generateSequence(numberOfValues);
    updateUI(); // Ensures UI is refreshed
}


function todoBien() {
    bien += 1;
    buenas.innerHTML = bien;
    velocidad.innerHTML = delayTime;

    if (increaseSpeed) {
        delayTime = Math.max(0.1, delayTime * 0.95);
    }
    if (increaseSequence) {
        numberOfValues += 1;
    }

    updateUI();
    botonBuenas.style.display = "none";
    botonMalas.style.display = "none";
}

function todoMal() {
    mal += 1;
    malas.innerHTML = mal;
    botonBuenas.style.display = "none";
    botonMalas.style.display = "none";
}

function verResultado() {
    //resultado.innerHTML = finalresult;
    cifras.innerHTML = 'R=' + finalresult;
    botonBuenas.style.display = "inline";
    botonMalas.style.display = "inline";
}

function reDisplay() {
    displayWithDelay(valuesToDisplay, delayTime * 1000);
}

function updateUI() {
    document.getElementById("delay").value = delayTime.toFixed(2);
    document.getElementById("numCount").value = numberOfValues;
    document.getElementById("valores").innerHTML = numberOfValues;
    document.getElementById("velocidad").innerHTML = delayTime.toFixed(2);
}



function toggleSettings() {
    var panel = document.getElementById("settingsPanel");
    panel.style.display = (panel.style.display === "none" || panel.style.display === "") ? "block" : "none";
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
