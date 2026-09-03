let currentNumber = "";
let previousNumber = "";
let operator = null;

const display = document.getElementById("display");
const history = document.getElementById("history");

function updateDisplay() {

if (currentNumber === "") {
display.textContent = "0";
} else {
display.textContent = formatNumber(currentNumber);
}

}

/* =========================
FORMAT ANGKA
========================= */

function formatNumber(number) {

if (
number === "" ||
number === "Error"
) {
return number;
}

const parts = number.split(".");

let integerPart = parts[0];

const decimalPart = parts[1];

const negative = integerPart.startsWith("-");

if (negative) {
integerPart = integerPart.substring(1);
}

integerPart = Number(integerPart).toLocaleString("id-ID");

if (decimalPart !== undefined) {
integerPart += "." + decimalPart;
}

return negative ? "-" + integerPart : integerPart;
}

/* =========================
INPUT ANGKA
========================= */

function appendNumber(number) {

if (currentNumber === "Error") {
clearDisplay();
}

if (currentNumber === "0") {
currentNumber = number;
} else {
currentNumber += number;
}

updateDisplay();
}

/* =========================
DESIMAL
========================= */

function appendDecimal() {

if (currentNumber.includes(".")) {
return;
}

if (currentNumber === "") {
currentNumber = "0.";
} else {
currentNumber += ".";
}

updateDisplay();
}

/* =========================
OPERATOR
========================= */

function chooseOperator(selectedOperator) {

if (
currentNumber === "" &&
previousNumber === ""
) {
return;
}

if (
previousNumber !== "" &&
currentNumber !== ""
) {
calculate();
}

if (currentNumber !== "") {

previousNumber = currentNumber;

currentNumber = "";


}

operator = selectedOperator;

history.textContent =
formatNumber(previousNumber) +
" " +
getOperatorSymbol(operator);
}

/* =========================
HITUNG
========================= */

function calculate() {

if (
previousNumber === "" ||
currentNumber === "" ||
operator === null
) {
return;
}

const firstNumber = parseFloat(previousNumber);

const secondNumber = parseFloat(currentNumber);

let result;

switch (operator) {

case "+":

  result =
    firstNumber + secondNumber;

  break;


case "-":

  result =
    firstNumber - secondNumber;

  break;


case "*":

  result =
    firstNumber * secondNumber;

  break;


case "/":

  if (secondNumber === 0) {

    display.textContent = "Error";

    history.textContent =
      "Tidak bisa dibagi dengan 0";

    currentNumber = "Error";

    previousNumber = "";

    operator = null;

    return;
  }

  result =
    firstNumber / secondNumber;

  break;


}

history.textContent =
formatNumber(previousNumber) +
" " +
getOperatorSymbol(operator) +
" " +
formatNumber(currentNumber) +
" =";

currentNumber =
String(Number(result.toFixed(10)));

previousNumber = "";

operator = null;

updateDisplay();
}

/* =========================
PERSEN
========================= */

function percentage() {

if (currentNumber === "") {
return;
}

const number =
parseFloat(currentNumber);

currentNumber =
String(number / 100);

updateDisplay();
}

/* =========================
HAPUS
========================= */

function deleteNumber() {

if (currentNumber === "Error") {

clearDisplay();

return;


}

currentNumber =
currentNumber.slice(0, -1);

updateDisplay();
}

/* =========================
RESET
========================= */

function clearDisplay() {

currentNumber = "";

previousNumber = "";

operator = null;

history.textContent = "";

updateDisplay();
}

/* =========================
SIMBOL OPERATOR
========================= */

function getOperatorSymbol(operator) {

const symbols = {

"+": "+",

"-": "−",

"*": "×",

"/": "÷"


};

return symbols[operator] || operator;
}

/* =========================
KEYBOARD
========================= */

document.addEventListener(
"keydown",
function(event) {

const key = event.key;


if (!isNaN(key)) {

  appendNumber(key);

  return;
}


if (key === ".") {

  appendDecimal();

  return;
}


if (
  key === "+" ||
  key === "-" ||
  key === "*" ||
  key === "/"
) {

  chooseOperator(key);

  return;
}


if (
  key === "Enter" ||
  key === "="
) {

  event.preventDefault();

  calculate();

  return;
}


if (key === "Backspace") {

  deleteNumber();

  return;
}


if (key === "Escape") {

  clearDisplay();

  return;
}


if (key === "%") {

  percentage();

}


}
);

/* Tampilan awal */

updateDisplay();
