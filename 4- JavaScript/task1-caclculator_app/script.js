const numOneEl = document.querySelector('.num-one');
const numTwoEl = document.querySelector('.num-two');
const resultEl = document.querySelector('.result');
const btnAddition = document.querySelector('.btn-addition');
const btnSubtraction = document.querySelector('.btn-subtraction');
const btnMultiplication = document.querySelector('.btn-multiplication');
const btnDivision = document.querySelector('.btn-division');

function calc(operator) {
  if (!numOneEl.value || !numTwoEl.value) return;

  let result;

  switch (operator) {
    case '+':
      result = +numOneEl.value + +numTwoEl.value;
      break;

    case '-':
      result = +numOneEl.value - +numTwoEl.value;
      break;
    case '*':
      result = +numOneEl.value * +numTwoEl.value;
      break;
    case '/':
      if (numTwoEl.value == 0) return alert('Cannot divided by zero');
      result = +numOneEl.value / +numTwoEl.value;
      break;

    default:
      break;
  }

  resultEl.value = result;
}

btnAddition.addEventListener('click', (e) => {
  e.preventDefault();
  calc('+');
});
btnSubtraction.addEventListener('click', (e) => {
  e.preventDefault();
  calc('-');
});
btnMultiplication.addEventListener('click', (e) => {
  e.preventDefault();
  calc('*');
});
btnDivision.addEventListener('click', (e) => {
  e.preventDefault();
  calc('/');
});
