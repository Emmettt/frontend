"use strict";

const passwordArray = [
  "qwerty",
  "123",
  "zxcvb",
  "123456",
  "tyui",
  "hjk",
  "fghjk",
  "vbnm"
];

switch (loggingIn(3)) {
  case true:
    alert("Добро пожаловать !");
    break;

  case false:
    alert("У вас закончились попытки, аккаунт заблокирован!");
    break;

  case null:
    alert("Приходите еще.");
    break;
}

function loggingIn(attempts) {
  let inputPassword;
  while (attempts) {
    inputPassword = getUserInput();
    if (inputPassword === null) return null;
    if (isValidPassword(passwordArray, inputPassword)) return true;
    attempts--;
    if (attempts !== 0) alert(`Осталось попыток : ${attempts}`);
  }
  return false;
}

function getUserInput() {
  const input = prompt("Введите Ваш пароль: ");
  return input;
}

function isValidPassword(passwordArray, inputPassword) {
  if (passwordArray.includes(inputPassword) === true) return true;
  return false;
}
