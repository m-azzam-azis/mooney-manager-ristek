const incomeId = document.querySelector("#income");
const expenseId = document.querySelector("#expense");
const budgetId = document.querySelector("#budget");

const editBudget = document.querySelector("#edit-budget");
const newRecord = document.querySelector("#new-record");

const closeBudget = document.querySelector('#close-budget');
const formBudget = document.querySelector('#form-budget');

const closeRecord = document.querySelector('#close-record');
const formRecord = document.querySelector('#form-record');

const budgetInFrom = document.querySelector("#budget-in-form");
const newBudget = document.querySelector("#new-budget");

let totalIncome = parseInt(localStorage.getItem("totalIncome")) || 0;
let totalExpense = parseInt(localStorage.getItem("totalExpense")) || 0;
let totalBudget = parseInt(localStorage.getItem("totalBudget")) || 0;

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

const formatter = (item) => {
  return "$" + item.toLocaleString('en-us');
}

function displayNumbers() {
  incomeId.textContent = (totalIncome === 0) ? "$0" : formatter(totalIncome);
  expenseId.textContent = (totalExpense === 0) ? "$0": formatter(totalExpense);
  budgetId.textContent = (totalBudget === 0) ? "$0" : formatter(totalBudget);
}

displayNumbers();

function toggleForm(item) {
  item.classList.toggle('open');
  item.classList.toggle('closed');
}

editBudget.addEventListener('click', () => {
  toggleForm(formBudget);
  budgetInFrom.textContent = budgetId.textContent;
  newBudget.focus();
});

// closeBudget.addEventListener('click', (e) => {
//   e.preventDefault();
//   toggleForm(formBudget);
// });

newRecord.addEventListener('click', () => {
  toggleForm(formRecord);
});

closeRecord.addEventListener('click', (e) => {
  e.preventDefault();
  toggleForm(formRecord);
});

newBudget.addEventListener('input', function() {
  // Remove non-numeric characters
  let input = this.value.replace(/\D/g, '');
  if (+input < 1) {
    this.value = '';
  } else {
    // Format currency
    input = input.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    input = '$' + input;

    // Update input value
    this.value = input;
  }
});

const submitBudget = document.querySelector("#submit-budget")
submitBudget.addEventListener('click', (e) => {
  e.preventDefault();
  totalBudget = parseInt(newBudget.value.replace(/\D/g, ''));
  if (isNaN(totalBudget) || totalBudget < 1) {
    return;
  } 
  displayNumbers();
  toggleForm(formBudget);
  localStorage.setItem('totalBudget', totalBudget)
  newBudget.value = '';
});

formBudget.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    submitBudget.click();
  }
});

formBudget.addEventListener('click', (e) => {
  if (e.target === formBudget || e.target === closeBudget) {
    e.stopPropagation();
    if (!formBudget.contains(e.target)) {
      formBudget.reset();
    }
    toggleForm(formBudget);
  }
});

closeBudget.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default action of the close button
  e.stopPropagation(); // Prevent the event from propagating further
  toggleForm(formBudget);
});


// const sumbitRecord = document.querySelector("#submit-record")
// submitRecord.addEventListener('click', (e) => {
//   e.preventDefault();
// });

// formRecord.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter') {
//     e.preventDefault();
//     sumbitRecord.click();
//   }
// });
