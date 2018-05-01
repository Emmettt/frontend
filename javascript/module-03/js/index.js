'use strict';

let userDB = {
  aaaaa: 'aaapsw',
  bbbbb: 'bbbpsw',
  ccccc: 'cccpsw',
  ddddd: 'dddpsw',
  eeeee: 'eeepsw',
  fffff: 'fffpsw',
  ggggg: 'gggpsw',
  hhhhh: 'hhhpsw'
};

const form = document.getElementById('logInForm');
const registerButton = document.getElementById('registerBtn');
const cancelButton = document.getElementById('cancelBtn');

const msgWindow = document.getElementById('msgContainer');
const msg = document.getElementById('message');
const okButton = document.getElementById('okBtn');

registerButton.addEventListener('click', registration);
okButton.addEventListener('click', refreshWindow);
cancelButton.addEventListener('click', refreshWindow);

refreshTable();

function registration() {
  const { login, password } = getUserInput();

  if (isExistLogin(login)) {
    showMessage('Пользователь с таким логином уже есть.');
    return;
  }

  if (isValid(login, password)) {
    addLogin(login, password);
    refreshTable();
    showMessage('Вы зарегистрированы как новый пользователь.');
  } else {
    showMessage(
      'Правила:  Логин и пароль должны состоять из букв, цифр и " _ " , длина от 6 символов.'
    );
  }
}

function getUserInput() {
  let login = document.getElementById('loginInput').value;
  let password = document.getElementById('passwordInput').value;
  return { login, password };
}

function isValid(login, password) {
  if (login.length > 5)
    if (password.length > 5)
      if (login.match(/[^\wа-яё]/gi) === null)
        if (password.match(/[^\wа-яё]/gi) === null) return true;
  return false;
}

function isExistLogin(login) {
  for (let key in userDB) {
    if (key === login) return true;
  }
  return false;
}

function addLogin(login, password) {
  userDB[login] = password;
}

function showMessage(message) {
  msg.innerHTML = message;
  form.style.display = 'none';
  msgWindow.style.display = 'block';
}

function refreshWindow() {
  //коряво крутим кино назад чтобы userDB в памяти выжила.
  document.getElementById('loginInput').value = '';
  document.getElementById('passwordInput').value = '';
  msgWindow.style.display = 'none';
  form.style.display = 'block';
}

function refreshTable() {
  const table = document.getElementById('userDB');
  table.innerHTML = '<tr><th>Login</th><th>Password</th></tr>';

  for (const key in userDB) {
    const row = document.createElement('tr');
    const login = document.createElement('td');
    const password = document.createElement('td');

    login.innerHTML = key;
    password.innerHTML = userDB[key];
    password.dataset.login = key;

    row.append(login, password);
    table.appendChild(row);
  }
}
