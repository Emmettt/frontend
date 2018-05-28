'use strict';

class Hamburger {
  constructor(size, stuffing) {
    this.size = Object.assign({}, size);
    this.stuffing = Object.assign({}, stuffing);
  }

  addTopping(topping) {
    if (!this.hasOwnProperty([topping.item])) {
      this[topping.item] = Object.assign({}, topping);
    }
  }

  removeTopping(topping) {
    if (!this.hasOwnProperty([topping.item])) {
      delete this[topping.item];
    }
  }

  getToppings() {
    let arrToppings = [];
    let key;
    for (key in this) {
      if (this.hasOwnProperty(key) && this[key].type === 'TOPPING')
        arrToppings.push(this[key].item);
    }
    return arrToppings;
  }

  getSize() {
    return this.size.item;
  }

  getStuffing() {
    return this.stuffing.item;
  }

  calculatePrice() {
    return Object.keys(this).reduce(
      (acc, item) => acc + (this[item].price ? this[item].price : 0),
      0
    );
  }

  calculateCalories() {
    return Object.keys(this).reduce(
      (acc, item) => acc + (this[item].calories ? this[item].calories : 0),
      0
    );
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

let hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_MEAT);
hamburger.addTopping(Hamburger.TOPPING_SPICE);
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
hamburger.addTopping(Hamburger.TOPPING_SPICE);
console.log('Toppings are: ', hamburger.getToppings());
console.log('Calories: ', hamburger.calculateCalories());
console.log('Price: ', hamburger.calculatePrice());
hamburger.addTopping(Hamburger.TOPPING_SAUCE);
console.log('Price with sauce: ', hamburger.calculatePrice());
console.log(
  'Is hamburger large: ',
  hamburger.getSize() === Hamburger.SIZE_LARGE.item
);
