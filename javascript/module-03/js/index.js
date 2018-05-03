'use strict';

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];
const login = prompt('Введите логин:');

addLogin(logins, login);

function addLogin(logins, login) {
  if (!checkLoginValidity(login)) {
    alert('Ошибка! Логин должен быть от 4 до 16 символов');
    return;
  } 
  if (checkIfLoginExists(logins, login)) {
   alert('Такой логин уже используется!');
   return;
  }
  logins.push(login);
  alert('Логин успешно добавлен!');
}

function checkLoginValidity(login) {
  return login.length >= 4 && login.length <= 16;
}

function checkIfLoginExists(logins, login) {
  return logins.includes(login);
}