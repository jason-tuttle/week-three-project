// select all the buttons for event handler
let buttons = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operate');

// CONSTANTS
const DISPLAY_DIGITS = 16; // how many digits fit in the display div

// need to store some things
let isTyping = false;
const operands = [];
const nextOperation = [];
const operations = {
  add: (op1, op2) => op1 + op2 ,
  subtract: (op1, op2) => op1 - op2 ,
  multiply: (op1, op2) => op1 * op2 ,
  divide: (op1, op2) => op1 / op2 ,
  modulo: (op1, op2) => op1 % op2 ,
  sqrt: (op1) => Math.sqrt(op1)
};

const opOrder = {
  subtract: 0,
  add: 1,
  divide: 2,
  multiply: 3,
  modulo: 4,
  sqrt: 5,
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
equalsButton.addEventListener('click', evaluate);

let clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clearAll);

// this function takes an array containing the operands and operation to be done
function performOperation(ops, op) {
  return operations[op[0]](ops.shift(), ops.shift());
}

function evaluate() {
  let finalResult;
  // console.log("I'm performing an operation!");
  isTyping = false;
  operands.push(parseFloat(display.textContent));
  if (nextOperation.length > 0) {
    while(nextOperation.length > 1) {
      let todo = nextOperation[0];
      let index = 0;
      for (let i = 1; i < nextOperation.length; i++) {
        if (opOrder[nextOperation[i]] > opOrder[todo]) {
          todo = nextOperation[i];
          index = i;
        }
      }
      let tempOps = operands.splice(index, 2);
      let result = performOperation(tempOps, nextOperation.splice(index, 1));
      operands.splice(index, 0, result);
    }
    finalResult = performOperation(operands, nextOperation.splice(0, 1));
  }
  let numLength = String(finalResult).length;
  if (numLength > DISPLAY_DIGITS) {
    if (isFloat(finalResult)) {
      let decimals = DISPLAY_DIGITS - String(Math.trunc(finalResult)).length;
      display.textContent = finalResult.toFixed(decimals);
    } else display.textContent = "ERROR";
  } else display.textContent = finalResult;

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
