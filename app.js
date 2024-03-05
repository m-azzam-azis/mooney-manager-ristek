const incomeDisplay = document.querySelector("#income");
const expenseDisplay = document.querySelector("#expense");
const budgetDisplay = document.querySelector("#budget");

const budgetEditButton = document.querySelector("#budget-edit-button");
const newRecordButton = document.querySelector("#new-record-button");

const budgetCloseButton = document.querySelector('#budget-close-button');
const budgetForm = document.querySelector('#budget-form');
const budgetSubmitButton = document.querySelector("#budget-submit-button")

const recordCloseButton = document.querySelector('#record-close-button');
const recordForm = document.querySelector('#record-form');

const budgetFormLabel = document.querySelector("#budget-form-label");
const budgetInput = document.querySelector("#budget-input");

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
  incomeDisplay.textContent = (totalIncome === 0) ? "$0" : formatter(totalIncome);
  expenseDisplay.textContent = (totalExpense === 0) ? "$0": formatter(totalExpense);
  budgetDisplay.textContent = (totalBudget === 0) ? "$0" : formatter(totalBudget);
}

displayNumbers();

function toggleForm(item) {
  item.classList.toggle('open');
  item.classList.toggle('closed');
}

budgetEditButton.addEventListener('click', () => {
  toggleForm(budgetForm);
  budgetFormLabel.textContent = budgetDisplay.textContent;
  budgetInput.focus();
});

// budgetCloseButton.addEventListener('click', (e) => {
//   e.preventDefault();
//   toggleForm(budgetForm);
// });

newRecordButton.addEventListener('click', () => {
  toggleForm(recordForm);
});

// recordCloseButton.addEventListener('click', (e) => {
//   e.preventDefault();
//   toggleForm(recordForm);
// });

budgetInput.addEventListener('input', function() {
  // Remove non-numeric characters
  this.value = this.value.replace(/\D/g, '');
  let input = this.value;

  if (+input < 1 || (input.startsWith('0') && input.length > 1)) {
    if (input === '0') {
      this.value = '0';
    } else if (input.length > 1) {
      // Allow overwriting '0' with another character
      if (input[0] === '0') {
        input = "$" + input.slice(1);
      }
      this.value = input;
    }
  } else {
    budgetInput.classList.remove("ring-2", "ring-red-500" ,"ring-inset");
    // Format currency
    input = input.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    input = '$' + input;

    // Update input value
    this.value = input;
  }
});

budgetSubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  totalBudget = parseInt(budgetInput.value.replace(/\D/g, ''));
  if (isNaN(totalBudget) || totalBudget < 0) {
    budgetInput.classList.add("ring-2", "ring-red-500" ,"ring-inset");
    return;
  } 
  displayNumbers();
  toggleForm(budgetForm);
  localStorage.setItem('totalBudget', totalBudget)
  budgetInput.value = '';
});

budgetForm.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    budgetSubmitButton.click();
  }
});

budgetForm.addEventListener('click', (e) => {
  if (e.target === budgetForm || e.target === budgetCloseButton) {
    e.preventDefault();
    if (!budgetForm.contains(e.target)) {
      budgetForm.reset();
    }
    budgetInput.classList.remove("ring-2", "ring-red-500" ,"ring-inset");
    budgetInput.value = '';
    toggleForm(budgetForm);
  }
});

recordForm.addEventListener('click', (e) => {
  if (e.target === recordForm || e.target === recordCloseButton) {
    e.preventDefault();
    if (!recordForm.contains(e.target)) {
      recordForm.reset();
    }
    toggleForm(recordForm);
  }
});

// const sumbitRecord = document.querySelector("#submit-record")
// submitRecord.addEventListener('click', (e) => {
//   e.preventDefault();
// });

// recordForm.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter') {
//     e.preventDefault();
//     sumbitRecord.click();
//   }
// });
