'use strict';

let id;
let url = 'https://test-users-api.herokuapp.com/users/';

const idInp = document.querySelector('.js-id');
const nameInp = document.querySelector('.js-name');
const ageInp = document.querySelector('.js-age');

const getBtn = document.querySelector('.js-get');
const addBtn = document.querySelector('.js-add');
const removeBtn = document.querySelector('.js-remove');
const updateBtn = document.querySelector('.js-update');

const responseLogArea = document.querySelector('.js-response');

getBtn.addEventListener('click', getUser.bind(this));
addBtn.addEventListener('click', postUser.bind(this));
removeBtn.addEventListener('click', removeUser.bind(this));
updateBtn.addEventListener('click', update.bind(this));

idInp.addEventListener('dblclick', () => (idInp.value = ''));
nameInp.addEventListener('dblclick', () => (nameInp.value = ''));
ageInp.addEventListener('dblclick', () => (ageInp.value = ''));

let users = getUsers()
  .then(response => {
    if (response.ok) return response.json();
    throw new Error('Error fetching data');
  })
  .then(data => {
    users = data.data;
    responseLog('', data);
  })
  .catch(error => console.log(error));

function responseLog(str, data) {
  if (data.status >= 300) {
    responseLogArea.textContent = 'ERROR: Status: ' + data.status;
  } else {
    responseLogArea.textContent = `${str}${JSON.stringify(data.data)}`;
  }
  console.log(users);
}

//======================================================
function getUsers(id) {
  if (id) return fetch(`${url}${id}`);
  return fetch(url);
}

function getUser() {
  getUsers(idInp.value)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .then(data => responseLog('', data))
    .catch(error => console.log(error));
}
//======================================================
//******************************************************
//======================================================
function postUser() {
  if (!nameInp.value) {
    alert('В поле "name" ведите имя');
    return;
  }

  if (isNaN(ageInp.value) || ageInp.value <= 0) {
    alert('В поле "age" ведите число > 0');
    return;
  }

  let name = nameInp.value;
  let age = ageInp.value;

  addUser(name, age)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .then(data => {
      if (data.status < 300) {
        users.push({
          id: data.data._id,
          name: data.data.name,
          age: data.data.age
        });
      }
      responseLog('ADDED :', data);
    })
    .catch(error => console.log('ERROR' + error));
}

function addUser(name, age) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ name: name, age: age }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}
//======================================================
//******************************************************
//======================================================
function removeUser() {
  let id = idInp.value;
  delUser(id)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .then(data => {
      if (data.status < 300 && data.data !== null) {
        users = users.filter(el => el.id !== data.data.id);
      }
      responseLog('REMOVED  :  ', data);
    });
}

function delUser(id) {
  return fetch(`${url}${id}`, {
    method: 'DELETE'
  });
}
//======================================================
//******************************************************
//======================================================
function update() {
  if (!nameInp.value) {
    alert('В поле "name" ведите имя');
    return;
  }

  if (isNaN(ageInp.value) || ageInp.value <= 0) {
    alert('В поле "age" ведите число > 0');
    return;
  }

  id = idInp.value;
  let user = {
    name: nameInp.value,
    age: Number(ageInp.value)
  };
  updateUser(id, user)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .then(data => {
      if (data.status < 300 && data.data !== null) {
        users.find(el => {
          if (el.id === data.data.id) {
            el.name = user.name;
            el.age = user.age;
            return true;
          }
          return false;
        });
      }
      responseLog('UPDATED :', data);
    });
}

function updateUser(id, user) {
  return fetch(url + id, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
}
//======================================================
