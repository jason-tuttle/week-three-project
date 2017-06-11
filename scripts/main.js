// select all the buttons for event handler
let buttons = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operate');

// need to store some things
let isTyping = false;
const operands = [];
const nextOperation = [];
const operations = {
  add: function(op1, op2) { return op1 + op2; },
  subtract: function(op1, op2) { return op1 - op2; },
  multiply: function(op1, op2) { return op1 * op2; },
  divide: function(op1, op2) { return op1 / op2; },
};
const opOrder = {
  subtract: 0,
  add: 1,
  divide: 2,
  multiply: 3
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
  // console.log("I'm performing an operation!");
  isTyping = false;
  operands.push(parseFloat(display.textContent));
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
  let finalResult = performOperation(operands, nextOperation);
  if (isFloat(finalResult)) {
    display.textContent = result.toFixed(4);
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
