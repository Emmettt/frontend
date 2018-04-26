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

function registration() {
  let [login, password] = getUserInput();

  if (isExistLogin(login)) {
    showMessage('Пользователь с таким логином уже есть.');
    return;
  }

  if (isValid(login, password) && !isExistLogin(login)) {
    addLogin(login, password);
    refreshTable();
    showMessage('Вы зарегистрированы как новый пользователь.');
  }
}

function getUserInput() {
  let login = document.getElementById('loginInput').value;
  let password = document.getElementById('passwordInput').value;
  return [login, password];
}

function isValid(login, password) {
  if (login.length < 4 || login.length > 16) {
    showMessage('Логин должен быть от 4 до 16 символов.');
    return false;
  }
  if (~login.indexOf(' ')) {
    showMessage('В логине не должно быть пробелов.');
    return false;
  }
  if (password.length < 6) {
    showMessage('Пароль должен быть больше 6 символов.');
    return false;
  }
  if (~password.indexOf(' ')) {
    showMessage('В пароле не должно быть пробелов.');
    return false;
  }
  return true;
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
  const msgWindow = document.getElementById('msgContainer');
  const msg = document.getElementById('message');
  const form = document.getElementById('logInForm');

  msg.innerHTML = message;
  form.style.display = 'none';
  msgWindow.style.display = 'block';
}

function refreshWindow() {
  //коряво крутим кино назад чтобы userDB в памяти выжила.
  const msgWindow = document.getElementById('msgContainer');
  const form = document.getElementById('logInForm');
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

(() => {
  const registerButton = document.getElementById('registerBtn');
  const okButton = document.getElementById('okBtn');
  const cancelButton = document.getElementById('cancelBtn');
  registerButton.addEventListener('click', registration);
  okButton.addEventListener('click', refreshWindow);
  cancelButton.addEventListener('click', refreshWindow);
  refreshTable();
})();
