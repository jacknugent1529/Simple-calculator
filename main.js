let result = 0;
let current = "0";
let buffer = ["add"];
function trimZeros(s) {
  // return s.replace(/^[0]+[0]+$/g, "");
  if (s == "0") {
    return s;
  }
  // s = s.replace(/^0*|\.\d*0*(?=$)/g, "");
  parts = s.split(".");
  parts[0] = parts[0].replace(/^0*/g, "");
  if (parts[1]) {
    parts[1] = parts[1].replace(/0*$/g, "");
    console.log(parts);
  }
  if (parts[0].length == 0) {
    parts[0] = "0";
  }
  s = parts.join(".");
  if (s[s.length - 1] == ".") {
    return s.substr(0, s.length - 1);
  }
  return s;
}
function updateDisplay(s) {
  if (s.length > 10 || isNaN(s.length)) {
    s = s.substr(0, 10);
    // print(s);
  }
  s = trimZeros(s);
  document.querySelector("#output").textContent = s;
}
function operate(operator) {
  buffer.push(operator);
  switch (buffer[0]) {
    case "add":
      result += parseFloat(current);
      current = "0";
      updateDisplay(result.toFixed(10));
      break;
    case "subtract":
      result -= parseFloat(current);
      current = "0";
      updateDisplay(result.toFixed(10));
      break;
    case "multiply":
      result *= parseFloat(current);
      current = "0";
      updateDisplay(result.toFixed(10));
      break;
    case "divide":
      result /= parseFloat(current);
      current = "0";
      updateDisplay(result.toFixed(10));
      break;
    case "equals":
      current = "0";
      updateDisplay(result.toFixed(10));
      break;
  }
  buffer.shift();
}
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (current == "0") {
      current = button.value;
    } else {
      if (!(button.value == "." && current.indexOf(".") != -1)) {
        current = current + button.value;
      }
    }
    updateDisplay(current);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "clear":
        current = "0";
        result = 0;
        buffer = ["add"];
        updateDisplay(current);
        break;
      case "backspace":
        current = current.slice(0, current.length - 1);
        if (current == "" || current == "-") {
          current = "0";
        }
        updateDisplay(current);
        break;
      case "plusMinus":
        if (current[0] == "-") {
          current = current.slice(1);
        } else if (current != 0) {
          current = "-" + current;
        }
        updateDisplay(current);
        break;
      default:
        operate(button.id);
    }
  });
});
