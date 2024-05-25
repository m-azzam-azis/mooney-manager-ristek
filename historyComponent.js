export function createTransactionHistoryItem(transaction) {
  let amountClass = "";
  if (transaction.type === "expense") {
    amountClass = "text-mainRed";
  } else if (transaction.type === "income") {
    amountClass = "text-mainGreen";
  }
  const date = new Date(transaction.date);
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `
    <div class="flex flex-col ring-shadow rounded-lg p-4 md:p-8 gap-4 transaction-item">
      <div class="flex justify-between text-xs md:text-sm">
        <p>${dateString}&nbsp;&nbsp;&nbsp;&nbsp;<span class="text-neutral-500 font-thin">${timeString}</span></p>
        <p class="font-bold text-sm transaction-category md:text-base">${transaction.category}</p>
      </div>
      <div class="flex gap-4 w-full">
        <img src="${transaction.url}" alt="${transaction.category}-icon" height="48px" width="48px">
        <div class="flex flex-col text-clip flex-1 truncate w-max-full">
          <h4 class="truncate text-base sm:text-lg md:text-xl font-bold transaction-name">${transaction.name}</h4>
          <p class=" truncate font-thin text-neutral-500 text-sm md:text-base">${transaction.description}</p>
        </div>
        
      </div>
      <div class="border border-neutral-300"> </div>
      <div class="${amountClass} flex-1 text-end font-bold text-lg md:text-2xl">${transaction.amount}</div>
    </div>
  `;
}