'use strict';

const grid = document.querySelector('.content');
const source = document.querySelector('#card-item').innerHTML.trim();
const template = Handlebars.compile(source);

const chkbox = document.querySelectorAll('.js-checkbox');
const filterbtn = document.querySelector('.js-filterbtn');

filterbtn.addEventListener('click', filterNrender);

filterNrender();

function filterNrender(e) {
  e ? e.preventDefault() : null;
  const filters = {
    size: [],
    color: [],
    releasedate: []
  };
  chkbox.forEach(el => (el.checked ? filters[el.name].push(el.value) : null));
  const markup = laptopsToRender(laptops, filters).reduce(
    (acc, el) => acc + template(el),
    ''
  );
  render(markup);
}

function laptopsToRender(db, filters) {
  let tmpArr;
  let arrFilteredGoods = db;
  for (let key in filters) {
    if (filters[key].length) {
      tmpArr = [];
      filters[key].forEach(elem =>
        tmpArr.push(...arrFilteredGoods.filter(el => el[key] == elem))
      );
      arrFilteredGoods = tmpArr;
    }
  }
  return arrFilteredGoods;
}

function render(markup) {
  grid.innerHTML = '';
  grid.insertAdjacentHTML(
    'beforeend',
    markup ? markup : '<p>No data to show</p>'
  );
}
