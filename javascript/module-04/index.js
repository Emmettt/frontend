'use strict';

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  pork: 80,
  cheese: 60,
  tea: 20,
  candy: 25
};

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1
};

function Cashier(name, products) {
  this.name = name;
  this.products = products;
  this.totalPrice = 0;
  this.customerMoney = 0;
  this.changeAmount = 0;

  this.countTotalPrice = function(order) {
    for (let key in order) {
      this.totalPrice += order[key] * this.products[key];
    }
  };

  this.getCustomerMoney = function() {
    do {
      this.customerMoney = prompt(
        `Общая сумма покупок - ${this.totalPrice}, гони бабло:`
      );
      if (this.customerMoney === null) {
        return null;
      }
      this.customerMoney = Number(this.customerMoney);
    } while (
      this.customerMoney < this.totalPrice ||
      Number.isNaN(this.customerMoney)
    );
  };

  this.countChange = function() {
    this.changeAmount = this.customerMoney - this.totalPrice;
  };

  this.reset = function() {
    this.totalPrice = 0;
    this.customerMoney = 0;
    this.changeAmount = 0;
  };

  this.serve = function(order) {
    if (!order) {
      return null;
    }
    this.countTotalPrice(order);
    this.getCustomerMoney();
    if (this.customerMoney !== null) {
      this.countChange();
      alert(`Спасибо за покупку, ваша сдача ${this.changeAmount}`);
    } else {
      alert('Очень жаль, что-то пошло не так, приходите еще');
    }
    this.reset();
  };
}

const cashier = new Cashier('mango', products);

cashier.serve(order);

