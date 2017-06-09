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
equalsButton.addEventListener('click', performOperation)

// this function takes an array containing the operands and operation to be done
function performOperation() {
  console.log("I'm performing an operation!");
  isTyping = false;
  operands.push(parseFloat(display.textContent));
  const result = operations[nextOperation.pop()](operands.shift(), operands.shift());
  display.textContent = result;
}

// addOperand happens every time a # button is pressed
function addOperand(event) {
  if (!isTyping) {
    display.textContent = "";
    display.textContent += event.target.id;
    isTyping = true;
  } else {
    display.textContent += event.target.id;
  }
  console.log(event.target.id);
}

function addOperator(event) {
  isTyping = false;
  operands.push(parseFloat(display.textContent));
  nextOperation.push(event.target.id);
  console.log(event.target.id);
}
