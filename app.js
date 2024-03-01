
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

function displayNumbers() {
  const formatter = (item) => {
    return "$" + item.toLocaleString('en-us');
  }

  incomeId.textContent = (totalIncome === 0) ? "-" : formatter(totalIncome);
  expenseId.textContent = (totalExpense === 0) ? "-" : formatter(totalExpense);
  budgetId.textContent = (totalBudget === 0) ? "-" : formatter(totalBudget);
}

displayNumbers();
function toggleForm(item) {
  item.classList.toggle('hidden');
}

editBudget.addEventListener('click', () => {
  toggleForm(formBudget);
  budgetInFrom.textContent = (totalBudget === 0) ? "-" : `$${totalBudget.toLocaleString()}`;

});

newRecord.addEventListener('click', () => {
  toggleForm(formRecord);
});

closeRecord.addEventListener('click', (e) => {
  e.preventDefault();
  toggleForm(formRecord);
});

closeBudget.addEventListener('click', (e) => {
  e.preventDefault();
  toggleForm(formBudget);
});


newBudget.addEventListener('input', function() {
  // Remove non-numeric characters
  let input = this.value.replace(/\D/g, '');

  // Format currency
  input = input.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  input = '$' + input;

  // Update input value
  this.value = input;
});

const submitBudget = document.querySelector("#submit-budget");
submitBudget.addEventListener('click', (e) => {
  e.preventDefault();

  // Check if the input value is not an empty string
  if (newBudget.value.trim() !== '') {
    const newTotalBudget = parseInt(newBudget.value.replace(/\D/g, ''));

    // Check if the input value is a valid number
    if (!isNaN(newTotalBudget)) {
      totalBudget = newTotalBudget;
      displayNumbers();
      localStorage.setItem('totalBudget', totalBudget);
      toggleForm(formBudget);
    }
  }
});
