'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');

  const timerContainer1 = document.createElement('div');
  timerContainer1.classList.add('container');
  timerContainer1.textContent = 'MAZAFAKA TIMER 1';
  body.insertBefore(timerContainer1, document.querySelector('script'));
  new Timer(timerContainer1);

  const timerContainer2 = document.createElement('div');
  timerContainer2.classList.add('container');
  timerContainer2.textContent = 'MAZAFAKA TIMER 2';
  body.insertBefore(timerContainer2, document.querySelector('script'));
  new Timer(timerContainer2);

  const timerContainer3 = document.createElement('div');
  timerContainer3.classList.add('container');
  timerContainer3.textContent = 'MAZAFAKA TIMER 3';
  body.insertBefore(timerContainer3, document.querySelector('script'));
  new Timer(timerContainer3);
});
