//define constants
const maxDigits = 10;

//define global variables
let currentDigits = "0";
usedDecimalPoint = false;


//set the initial number display
const numberDisplay = document.querySelector(".readout");
numberDisplay.innerText = currentDigits;


// Create listeners for keys
const numberButtons = Array.from(document.querySelectorAll('.btn-num'));
  numberButtons.forEach(numberButton => numberButton.addEventListener('click', inputNumber));

function inputNumber(e) {
    //check that there is space to add extra digits
    if (currentDigits.length <10) {
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
    if (currentDigits === "0") {
        if (digit = ".") {
            currentDigits = "0.";
        } else {
            currentDigits = "";
        }
    } else {
        currentDigits += digit;
    }
    numberDisplay.innerText = currentDigits;
}