'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// DISPLAY CASH MOVEMENT
const displayMovement = function (movement) {
  containerMovements.innerHTML = '';
  movement.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i} ${type}
          </div>
          <div class="movements__date">24/01/2037</div>
          <div class="movements__value">${mov}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// DISPLAY BALANCE

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((accu, currV) => accu + currV, 0);

  labelBalance.textContent = `₦ ${acc.balance}`;
};

const creatNewUsers = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(letter => letter[0])
      .join('');
  });
};
creatNewUsers(accounts);
console.log(accounts);

// total icome
const displayIncome = function (acctr) {
  const income = acctr.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `₦ ${income} `;
  const interest = acctr.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acctr.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, intr) => acc + intr, 0);
  labelSumInterest.textContent = `₦ ${interest}`;
};

const displayexpenses = function (movements) {
  const expenses = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `₦ ${Math.abs(expenses)}`;
};

const juliDogs = [2, 1, 7, 8, 9];
const dayoDogs = [5, 6, 3, 2, 9];

const newJuliDog = juliDogs.slice(1, 3);
const bothDogs = newJuliDog.concat(dayoDogs);
console.log(bothDogs);

const checkDogs = function (owner) {
  owner.forEach(function (age, i) {
    const status = age >= 3 ? 'an Adult' : 'a puppy';
    console.log(`Dog number ${i + 1} is ${status} and its ${age} years Old`);
  });
};
checkDogs(bothDogs);
const usd = 400;
const incomes = [200, 100, 300];
const mappedIncome = incomes.map(income => usd * income);
console.log(mappedIncome);

// const user = 'Steven Thomas Williams';
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(letter => letter[0])
//   .join(' ');
// console.log(username);

const movements = [200, -200, 340, -300, -20, 50, 400, -460];
const deposit = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposit);

const newDeposit = [];
for (const move of movements) {
  if (move > 0) {
    newDeposit.push(move);
  }
}
console.log(newDeposit);
const withdrawal = movements.filter(mov => mov < 0);
console.log(withdrawal);
const balance = movements.reduce(
  (accm, currentValue) => accm + currentValue,
  0
);
console.log(balance);
const findAccount = function (users) {
  const acct = users.find(user => user.owner === 'Sarah Smith');
  console.log(acct);
};
findAccount(accounts);
const updateUi = function (acc) {
  // display movement
  displayMovement(acc.movements);
  // display balance
  displayBalance(acc);
  // display incomes
  displayIncome(acc);
  // display incomes
  displayexpenses(acc.movements);
};
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    user => user.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `  Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUi(currentAccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmt = Number(inputTransferAmount.value);
  const transferTo = accounts.find(
    accOwner => accOwner.username === inputTransferTo.value
  );
  if (
    transferAmt > 0 &&
    transferTo &&
    currentAccount.balance >= transferAmt &&
    transferTo?.username !== currentAccount.username
  ) {
    console.log('Transfer Valid');
    currentAccount.movements.push(-transferAmt);
    transferTo.movements.push(transferAmt);
    updateUi(currentAccount);
  } else {
    console.log('invalid Transaction');
  }
});
