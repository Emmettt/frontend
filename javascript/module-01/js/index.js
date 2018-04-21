const resorts = {
  sharm: 16,
  hurgada: 6,
  taba: 6,
  antalya: 6,
  bali: 0,
  thailand: 9,
  greece: 18,
  spain: 7,
};

renderView();

function renderView() {
  initOrderBtn(processOrder);
  initResortsTable();
}

function initOrderBtn(cb) {
  const orderBtn = document.getElementById('btn');
  orderBtn.addEventListener('click', cb);
}

function initResortsTable() {
  const table = document.getElementById('resorts');

  for (const key in resorts) {
    const row = document.createElement('tr');
    const resort = document.createElement('td');
    const vouchers = document.createElement('td');

    resort.innerHTML = key;
    vouchers.innerHTML = resorts[key];
    vouchers.dataset.resort = key;

    row.append(resort, vouchers);
    table.appendChild(row);
  }
}

function updateResortsTable(key) {
  const cell = document.querySelector(`#resorts td[data-resort="${key}"]`);
  cell.innerHTML = resorts[key];
}

function processOrder() {
  const userInput = getUserInput();
  const isValidInput = checkUserInputValidity(userInput);

  if (!isValidInput) {
    alert('wtf dude, get your shit straight! positive numbers only!');
    return;
  }

  const resort = checkAvailableResort(userInput);

  if (resort) {
    resorts[resort] -= userInput;
    updateResortsTable(resort);

    alert(`Давай не пей много на ${resort}, целуем в лобик!`);
  } else {
    alert('Да ты походу никуда не хочешь, ну и ладно!');
  }
}

function getUserInput() {
  return Number(prompt('Сколько путевок надо ?: '));
}

function checkUserInputValidity(val) {
  const isInRange = val >= 1;
  const isValidInput = val !== null;
  const isNaN = Number.isNaN(val);

  if (isValidInput && !isNaN && isInRange) {
    return true;
  }

  return false;
}

function checkAvailableResort(num) {
  const entries = Object.entries(resorts);
  const sortedEntries = entries.sort((a, b) => a[1] > b[1]);

  for (const entry of sortedEntries) {
    const [name, value] = entry;

    if (value >= num) {
      const isGoing = confirm(
        `Едем в ${name}? Доступно ${value}, требуется ${num}.`,
      );

      if (isGoing) return name;
    }
  }

  return null;
}