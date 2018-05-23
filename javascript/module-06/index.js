'use strict';

class Hamburger {
  constructor(size, stuffing) {
    if (size === undefined)
      throw new Error('HamburgerException: no size given');
    if (stuffing === undefined)
      throw new Error('HamburgerException: no stuffing given');
    if (size.type != 'SIZE')
      throw new Error(`HamburgerException: invalid size ${size.item}`);
    if (stuffing.type != 'STUFFING')
      throw new Error(`HamburgerException: invalid stuffing ${stuffing.item}`);

    this.size = Object.assign({}, size);
    this.stuffing = Object.assign({}, stuffing);
  }
}

Hamburger.SIZE_SMALL = {
  type: 'SIZE',
  item: 'SIZE_SMALL',
  calories: 200,
  price: 15
};
Hamburger.SIZE_LARGE = {
  type: 'SIZE',
  item: 'SIZE_LARGE',
  calories: 300,
  price: 25
};
Hamburger.STUFFING_CHEESE = {
  type: 'STUFFING',
  item: 'STUFFING_CHEESE',
  calories: 100,
  price: 10
};
Hamburger.STUFFING_SALAD = {
  type: 'STUFFING',
  item: 'STUFFING_SALAD',
  calories: 20,
  price: 5
};
Hamburger.STUFFING_MEAT = {
  type: 'STUFFING',
  item: 'STUFFING_MEAT',
  calories: 500,
  price: 20
};
Hamburger.TOPPING_SPICE = {
  type: 'TOPPING',
  item: 'TOPPING_SPICE',
  calories: 5,
  price: 3
};
Hamburger.TOPPING_SAUCE = {
  type: 'TOPPING',
  item: 'TOPPING_SAUCE',
  calories: 50,
  price: 7
};

Hamburger.prototype.addTopping = function(topping) {
  if (this.hasOwnProperty([topping.item])) {
    throw new Error(`HamburgerException: duplicate topping ${topping.item}`);
  }
  this[topping.item] = Object.assign({}, topping);
};

Hamburger.prototype.removeTopping = function(topping) {
  if (!this.hasOwnProperty([topping.item])) {
    throw new Error(`HamburgerException: No topping to remove ${topping.item}`);
  }
  delete this[topping.item];
};

Hamburger.prototype.getToppings = function() {
  let arrToppings = [];
  let key;
  for (key in this) {
    if (this.hasOwnProperty(key) && this[key].type === 'TOPPING')
      arrToppings.push(this[key].item);
  }
  return arrToppings;
};

Hamburger.prototype.getSize = function() {
  return this.size.item;
};

Hamburger.prototype.getStuffing = function() {
  return this.stuffing.item;
};

Hamburger.prototype.calculatePrice = function() {
  return Object.keys(this).reduce(
    (acc, item) => acc + (this[item].price || 0),
    0
  );
};

Hamburger.prototype.calculateCalories = function() {
  return Object.keys(this).reduce(
    (acc, item) => acc + (this[item].calories || 0),
    0
  );
};

let hamburger;
try {
  hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_MEAT);
} catch (e) {
  console.log(e.name + ': ' + e.message);
  // exit
}

try {
  hamburger.removeTopping(Hamburger.TOPPING_SPICE);
} catch (e) {
  console.log(e.name + ': ' + e.message);
  // exit
}

console.log('Calories: ', hamburger.calculateCalories());
console.log('Price: ', hamburger.calculatePrice());
hamburger.addTopping(Hamburger.TOPPING_SAUCE);
console.log('Price with sauce: ', hamburger.calculatePrice());
console.log(
  'Is hamburger large: ',
  hamburger.getSize() === Hamburger.SIZE_LARGE.item
);
