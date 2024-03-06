const date = new Date();

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

const incomeFormChoice = document.querySelector("#income-choice");
const expenseFormChoice = document.querySelector("#expense-choice");
let incomeChoiceSelected = false;
let expenseChoiceSelected = false;

let totalIncome = parseInt(localStorage.getItem("totalIncome")) || 0;
let totalExpense = parseInt(localStorage.getItem("totalExpense")) || 0;
let totalBudget = parseInt(localStorage.getItem("totalBudget")) || 0;

let listOfOrders = JSON.parse(localStorage.getItem('listOfOrders')) || [];

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

const validCategories = ["Salary",
  "Housing",
  "Transportation",
  "Food",
  "Bills",
  "Others"];

function resetInput() {
  orderCategory.value = '';
  orderName.value = '';
  orderDescription.value = '';
  orderInput.value = '';
}

function getIconUrl(selectedCategory) {
  switch(selectedCategory) {
    case("Salary"): return "./icons/income-icon.png"
    case("Housing"): return "./icons/housing-icon.png"
    case("Transportation"): return "./icons/transport-icon.png"
    case("Food"): return "./icons/food-icon.png"
    case("Bills"): return "./icons/bill-icon.png"
    case("Others"): return "./icons/other-icon.png"
  }
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
  if (!expenseChoiceSelected && !incomeChoiceSelected) {
    incomeChoiceSelected = true;
    incomeFormChoice.classList.remove("font-normal")
    incomeFormChoice.classList.add("bg-main", "font-bold");
  }
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
    resetInput();
    toggleForm(recordForm);
  }
});

incomeFormChoice.addEventListener('click', (e) => {
  e.preventDefault();
  if (!incomeChoiceSelected) {
    incomeChoiceSelected = true;
    incomeFormChoice.classList.remove("font-normal")
    incomeFormChoice.classList.add("bg-main", "font-bold");
    
    expenseChoiceSelected = false;
    expenseFormChoice.classList.add("font-normal")
    expenseFormChoice.classList.remove("bg-main", "font-bold");
  }
});

expenseFormChoice.addEventListener('click', (e) => {
  e.preventDefault();
  if (!expenseChoiceSelected) {
    expenseChoiceSelected = true;
    expenseFormChoice.classList.remove("font-normal")
    expenseFormChoice.classList.add("bg-main", "font-bold");
    
    incomeChoiceSelected = false;
    incomeFormChoice.classList.add("font-normal")
    incomeFormChoice.classList.remove("bg-main", "font-bold");
  }
});

const orderCategory = document.querySelector("#order-category");
const orderName = document.querySelector("#order-name");
const orderDescription = document.querySelector("#order-description");
const orderInput = document.querySelector("#order-input");
const orderSubmitButton = document.querySelector("#order-submit-button")

orderInput.addEventListener('input', function() {
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
    orderInput.classList.remove("ring-2", "ring-red-500" ,"ring-inset");
    // Format currency
    input = input.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    input = '$' + input;

    // Update input value
    this.value = input;
  }
});

orderSubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (!orderCategory.value) {
    orderCategory.classList.add("ring-2", "ring-red-500");
    return;
  }
  
  if (!orderName.value) {
    orderName.classList.add("ring-2", "ring-red-500" ,"ring-inset");
    return;
  }
  
  if (!orderInput.value) {
    orderInput.classList.add("ring-2", "ring-red-500" ,"ring-inset");
    return;
  }
  
  // rest of the code
  
  // combine all the else blocks at the bottom
  if (orderCategory.value && orderName.value && orderDescription.value && orderInput.value) {
    orderCategory.classList.remove("ring-2", "ring-red-500" ,"ring-inset");
    orderName.classList.remove("ring-2", "ring-red-500" ,"ring-inset");
    orderDescription.classList.remove("ring-2", "ring-red-500" ,"ring-inset");
    orderInput.classList.remove("ring-2", "ring-red-500" ,"ring-inset");
  }

  let category;
  incomeChoiceSelected ? category = 'income' : category = 'expense';

  let newObject = {
    type: category,
    category: orderCategory.value,
    url: getIconUrl(orderCategory.value),
    name: orderName.value,
    description: orderDescription.value,
    amount: orderInput.value,
    date: date.toJSON()
  }

  if (category === 'income'){
    totalIncome += parseInt(orderInput.value.replace(/\D/g, ''));
    totalBudget += parseInt(orderInput.value.replace(/\D/g, ''));
  } else {
    totalExpense += parseInt(orderInput.value.replace(/\D/g, ''));
    totalBudget -= parseInt(orderInput.value.replace(/\D/g, ''));
  }
  listOfOrders.push(newObject);
  localStorage.setItem('totalIncome', totalIncome);
  localStorage.setItem('totalExpense', totalExpense);
  localStorage.setItem('totalBudget', totalBudget);
  localStorage.setItem('listOfOrders', JSON.stringify(listOfOrders));
  console.table(listOfOrders);
  resetInput();
  displayNumbers();
  toggleForm(recordForm);
});
