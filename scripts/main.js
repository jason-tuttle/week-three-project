// select all the buttons for event handler
let buttons = document.querySelectorAll('.button');

// need to store some things
let isTyping = false;
let calculation = [];
const operations = {
  "add": function(op1, op2) { return op1 + op2; },
  "subtract": function(op1, op2) { return op1 - op2; },
  "multiply": function(op1, op2) { return op1 * op2; },
  "divide": function(op1, op2) { return op1 / op2: }
};
operations["key"]

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", performFunction(event));
}
