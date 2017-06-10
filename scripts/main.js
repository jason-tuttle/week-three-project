// select all the buttons for event handler
let buttons = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operate');

// need to store some things
let isTyping = false;
let operands = [];
let nextOperation = [];

const operations = {
  add: function(op1, op2) { return op1 + op2; },
  subtract: function(op1, op2) { return op1 - op2; },
  multiply: function(op1, op2) { return op1 * op2; },
  divide: function(op1, op2) { return op1 / op2; },
};

// get a hook into all the # buttons
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", addOperand);
}

// get a hook into all the operators
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", addOperator);
}

// get a hook for the display
let display = document.querySelector('.display');

let equalsButton = document.querySelector('.calculate');
equalsButton.addEventListener('click', performOperation);

let clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearAll);

// this function takes an array containing the operands and operation to be done
function performOperation() {
  // console.log("I'm performing an operation!");
  isTyping = false;
  operands.push(parseFloat(display.textContent));
  const result = operations[nextOperation.pop()](operands.shift(), operands.shift());
  if (isFloat(result)) {
    display.textContent = result.toFixed(4);
  } else display.textContent = result;
}

// addOperand happens every time a digit is pressed
function addOperand(event) {
  if (!isTyping) {  // if the user is starting a new #,
    display.textContent = ""; // clear the display,
    display.textContent += event.target.id; // add the new digit,
    isTyping = true;  // set the flag to allow more digits to be entered
  } else {
    display.textContent += event.target.id; // user is still adding digits
  }
  // console.log(event.target.id);
}

function addOperator(event) {
  isTyping = false; // user must be done typing in a number
  operands.push(parseFloat(display.textContent)); // push the current # to our stack
  nextOperation.push(event.target.id);  // add the operation to perform
  // console.log(event.target.id);
}

function clearAll() {
  isTyping = false;
  operands.length = 0;  // clear any operands in the stack
  nextOperation.length = 0; // clear incomplete operations
  display.textContent = "0";  // clear the display
}
function isFloat(num) {
  return (num % 1 != 0);
}
