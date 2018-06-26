'use strict';

class Timer {
  constructor(parentNode) {
    this.display;
    this.startBtn;
    this.lapBtn;
    this.resetBtn;
    this.listWrapper;
    this.lapsList;
    this.lapsListItem;
    this.timer = this.renderTimer(parentNode);
    this.ticker;
    this.state = {
      msTime: 0,
      msSession: 0,
      ticking: false,
      laps: []
    };
    this.startBtn.addEventListener('click', this.startstopTimer.bind(this));
    this.lapBtn.addEventListener('click', this.getLap.bind(this));
    this.resetBtn.addEventListener('click', this.reset.bind(this));
  }

  renderTimer(parentNode) {
    const stopwatch = document.createElement('div');
    stopwatch.classList.add('stopwatch');

    this.display = document.createElement('p');
    this.display.classList.add('time', 'js-time');
    this.display.textContent = '00:00.0';

    this.startBtn = document.createElement('button');
    this.startBtn.classList.add('btn', 'js-start');
    this.startBtn.textContent = 'Start';

    this.lapBtn = document.createElement('button');
    this.lapBtn.classList.add('btn', 'js-take-lap');
    this.lapBtn.textContent = 'Lap';
    this.lapBtn.disabled = true;
    this.lapBtn.classList.add('inactive');

    this.resetBtn = document.createElement('button');
    this.resetBtn.classList.add('btn', 'reset');
    this.resetBtn.textContent = 'Reset';

    this.listWrapper = document.createElement('div');
    this.listWrapper.classList.add('listWrapper');

    this.lapsList = document.createElement('ul');
    this.lapsList.classList.add('laps', 'js-laps');

    this.lapsListItem = document.createElement('li');
    this.lapsListItem.classList.add('lap-item', 'js-lap-item');

    stopwatch.appendChild(this.display);
    stopwatch.appendChild(this.startBtn);
    stopwatch.appendChild(this.lapBtn);
    stopwatch.appendChild(this.resetBtn);
    this.listWrapper.appendChild(this.lapsList);
    stopwatch.appendChild(this.listWrapper);

    parentNode.appendChild(stopwatch);

    return parentNode;
  }

  startstopTimer() {
    if (!this.state.ticking) {
      this.state.ticking = !this.state.ticking;
      this.startBtn.textContent = 'Pause';
      this.lapBtn.disabled = false;
      this.lapBtn.classList.toggle('inactive');
      this.tick();
    } else {
      clearInterval(this.ticker);
      this.state.msTime += this.state.msSession;
      this.state.msSession = 0;
      this.state.ticking = !this.state.ticking;
      this.startBtn.textContent = 'Continue';
      this.lapBtn.disabled = true;
      this.lapBtn.classList.toggle('inactive');
    }
  }

  tick() {
    let start = Date.now();
    this.ticker = setInterval(() => {
      this.state.msSession = Date.now() - start;
      let min = parseInt((this.state.msTime + this.state.msSession) / 60000);
      let sec = parseInt(
        (this.state.msTime + this.state.msSession) / 1000 - min * 60
      );
      let ms = parseInt(
        (this.state.msTime + this.state.msSession) / 100 - min * 600 - sec * 10
      );
      this.display.textContent = `${min < 10 ? '0' + min : min}:${
        sec < 10 ? '0' + sec : sec
      }:${ms}`;
    }, 100);
  }

  getLap() {
    let min = parseInt((this.state.msTime + this.state.msSession) / 60000);
    let sec = parseInt(
      (this.state.msTime + this.state.msSession) / 1000 - min * 60
    );
    let ms = parseInt(
      (this.state.msTime + this.state.msSession) / 100 - min * 600 - sec * 10
    );
    let lapTime = `${min < 10 ? '0' + min : min}:${
      sec < 10 ? '0' + sec : sec
    }:${ms}`;
    this.state.laps.push(lapTime);
    this.lapsList.appendChild(this.lapsListItem.cloneNode(false));
    lapTime = `Lap ${this.state.laps.length} ------- ${lapTime}`;
    this.lapsList.lastElementChild.textContent = lapTime;
    console.log(this.state.laps);
  }

  reset() {
    this.state = {
      msTime: 0,
      msSession: 0,
      ticking: false,
      laps: []
    };
    clearInterval(this.ticker);
    this.lapsList.innerHTML = '';
    this.display.textContent = '00:00.0';
    this.startBtn.textContent = 'Start';
    this.lapBtn.disabled = true;
    this.lapBtn.classList.add('inactive');
  }
}
