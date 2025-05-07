const ageEl = document.querySelector('.age');
const salaryEl = document.querySelector('.salary');
const resultEl = document.querySelector('.result');
const btnLoan = document.querySelector('.btn-loan');

function loanRequest() {
  const age = +ageEl.value;
  const salary = +salaryEl.value;

  if (!age || !salary) {
    return alert('Please enter age and salary');
  }
  let result;

  if (age < 18 || age > 60) {
    result =
      'Applicant is rejected because they do not meet the minimum requirements';
  } else if (salary < 5000) {
    result =
      'Applicant is rejected because they do not meet the minimum requirements';
  } else {
    result = `Congratulations! You are eligible for ${
      salary > 30000 ? 60000 : salary * 3
    } EGP loan`;
  }

  resultEl.value = result;
}

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();

  loanRequest();
});
