//define constants
const maxDigits = 12;

//define global variables
let currentDigits = "0";
let previousDigits = "0"; //this gets set when the user selects an operator
let usedDecimalPoint = false;
let isNegative = false;
let currentOperator = "";
let firstNumberAfterOperator = false;


//set the initial number display
const numberDisplay = document.querySelector(".readout");
numberDisplay.innerText = currentDigits;

//--------------------------
// Create listeners for number keys
const numberButtons = Array.from(document.querySelectorAll('.btn-num'));
numberButtons.forEach(numberButton => numberButton.addEventListener('click', inputNumber));

// Create listeners for operator keys
const operatorButtons = Array.from(document.querySelectorAll(".btn-operator"));
operatorButtons.forEach(operatorButton => operatorButton.addEventListener("click", selectOperator));

const btnClear = document.querySelector("#clear");
btnClear.addEventListener("click", clearDisplay);

const btnNegative = document.querySelector("#neg");
btnNegative.addEventListener("click", switchNegative);

const btnDelete = document.querySelector("#del");
btnDelete.addEventListener("click", deleteNumber);

const btnEqual = document.querySelector("#equal");
btnEqual.addEventListener("click", doEqual);


//--------------------------



function inputNumber(e) {

    if (firstNumberAfterOperator) {
        currentDigits = "";
        numberDisplay.innerText = currentDigits;
        usedDecimalPoint = false;

    }

    //check that there is space to add extra digits
    if (currentDigits.length < maxDigits) {
        if (e.srcElement.innerText === ".") {
            if (!usedDecimalPoint && currentDigits.length < maxDigits -1) {
                updateDisplay(e.srcElement.innerText);
                usedDecimalPoint = true;
            }
        } else {
            //update the display
            updateDisplay(e.srcElement.innerText);
        }
    }
    console.log(e.srcElement.innerText);
    firstNumberAfterOperator = false;
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
    previousDigits = "";
    currentOperator = "";
    firstNumberAfterOperator = false;
    numberDisplay.innerText = currentDigits;
    usedDecimalPoint = false;
}

function switchNegative() {
    if (!isNegative && currentDigits.length < maxDigits - 1 && currentDigits !== "0") {
        currentDigits = "-" + currentDigits;
        isNegative = true;
    } else if (isNegative) {
        currentDigits = currentDigits.replace("-", "");
        isNegative = false;
        //currentDigits = "TEST";
    }
    numberDisplay.innerText = currentDigits;
}

function deleteNumber() {
    currentDigits = currentDigits.substr(0, currentDigits.length - 1);
    if (currentDigits == "" || currentDigits == "-" ) {
        currentDigits = "0";
        numberDisplay.innerText = currentDigits;
    } else {
        numberDisplay.innerText = currentDigits;
    }
}

function selectOperator(e) {

    //check if this is the first number entered, or if we're making a calculation
    if (currentOperator !== "") {
        updateTotal();
        //currentDigits = "";
        
    }

    //set currentOperator, which we can use to check what should happen
    // any time an operator or the equal key is pressed
    if (e.srcElement.innerText == "X") {
        currentOperator = "*";
    } else if (e.srcElement.innerText == "÷") {
        currentOperator = "/";
    } else {
        currentOperator = e.srcElement.innerText;
    }
    console.log(currentOperator);
    previousDigits = currentDigits;
    firstNumberAfterOperator = true;
}

function updateTotal() {
    if (previousDigits != "") {
        let tempNum = currentDigits;
        if (currentOperator == "+") {
            currentDigits = Number(previousDigits) + Number(currentDigits);
        } else if (currentOperator == "-") {
            currentDigits = Number(previousDigits) - Number(currentDigits);
        } else if (currentOperator == "/") {
            currentDigits = roundToTwo(Number(previousDigits) / Number(currentDigits));
        } else {
            currentDigits = Number(previousDigits) * Number(currentDigits);
        }
        previousDigits = "";
        numberDisplay.innerText = currentDigits;
        usedDecimalPoint = false;
        console.log(currentDigits);
        console.log("test");
        
    }
}

function doEqual() {
    updateTotal();
}

//don't really understand how this rounding function works!
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}