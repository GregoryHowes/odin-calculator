//define constants
const maxDigits = 12;

//define global variables
let currentDigits = "0";
usedDecimalPoint = false;


//set the initial number display
const numberDisplay = document.querySelector(".readout");
numberDisplay.innerText = currentDigits;

//--------------------------
// Create listeners for keys
const numberButtons = Array.from(document.querySelectorAll('.btn-num'));
numberButtons.forEach(numberButton => numberButton.addEventListener('click', inputNumber));

const btnClear = document.querySelector("#clear");
btnClear.addEventListener("click", clearDisplay);

//--------------------------



function inputNumber(e) {
    //check that there is space to add extra digits
    if (currentDigits.length < maxDigits) {
        if (e.srcElement.innerText === ".") {
            if (!usedDecimalPoint) {
                updateDisplay(e.srcElement.innerText);
                usedDecimalPoint = true;
            }
        } else {
            //update the display
            updateDisplay(e.srcElement.innerText);
        }
    }
    console.log(e.srcElement.innerText);
}

function updateDisplay(digit) {
    //if display is still zero then set it to blank
    if (currentDigits == "0") {
        if (digit == ".") {
            currentDigits = "0.";
        } else {
            if (digit !== "0" && digit != "00") {
                currentDigits = digit;
            }
        }
    } else {
        currentDigits += digit;
    }
    numberDisplay.innerText = currentDigits;
}

function clearDisplay() {
    currentDigits = "0";
    numberDisplay.innerText = currentDigits;
    usedDecimalPoint = false;
}