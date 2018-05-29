'use strict';

class Hamburger {
  constructor(size, stuffing) {
    this.stuff = [];
    this.stuff.push({ ...size }, { ...stuffing });
  }

  addTopping(topping) {
    if (!this.stuff.some(element => element.item === topping.item)) {
      this.stuff.push({ ...topping });
    }
  }

  removeTopping(topping) {
    this.stuff = this.stuff.filter(element => element.item !== topping.item);
  }

  getToppings() {
    let arrToppings = [];
    this.stuff.forEach(element => {
      if (element.type === 'TOPPING') {
        arrToppings.push(element.item);
      }
    });
    return arrToppings;
  }

  getSize() {
    return this.stuff.find(element => element.type === 'SIZE').item;
  }

  getStuffing() {
    return this.stuff.find(element => element.type === 'STUFFING').item;
  }

  calculatePrice() {
    return this.stuff.reduce((acc, element) => (acc += element.price), 0);
  }

  calculateCalories() {
    return this.stuff.reduce((acc, element) => (acc += element.calories), 0);
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
console.log(hamburger);

hamburger.addTopping(Hamburger.TOPPING_SPICE);
hamburger.addTopping(Hamburger.TOPPING_SPICE);

hamburger.removeTopping(Hamburger.TOPPING_SPICE);
hamburger.addTopping(Hamburger.TOPPING_SAUCE);
hamburger.addTopping(Hamburger.TOPPING_SPICE);
hamburger.addTopping(Hamburger.TOPPING_SPICE);
hamburger.addTopping(Hamburger.TOPPING_SPICE);

console.log('Toppings are: ', hamburger.getToppings());
console.log(hamburger.getSize());
console.log(hamburger.getStuffing());
console.log('Calories: ', hamburger.calculateCalories());
console.log('Price: ', hamburger.calculatePrice());
hamburger.addTopping(Hamburger.TOPPING_SAUCE);
console.log('Price with sauce: ', hamburger.calculatePrice());
console.log(
  'Is hamburger large: ',
  hamburger.getSize() === Hamburger.SIZE_LARGE.item
);
Hamburger.SIZE_LARGE.calories = 3;
console.log(hamburger);
