'use strict';

const RPSRunner = require('../domain/rps/Runner');
const constants = require('../domain/rps/constants');

const runner = new RPSRunner();

class App {
  constructor() {
    this.chooseGamePage = null;
    this.chooseGesturePage = null;
    this.loadingPage = null;
    this.resultPage = null;
    this.results = {};
  }

  init() {
    this.hookEvents();
    this.mapInterface();
    this.showGameChanger();
    return this;
  }

  hookEvents() {
    document
      .getElementById('gamePlayerVsComputer')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.showGestureChooser()
          .then(gesture => Promise.all([gesture, this.showLoading()]))
          .then(([gesture]) => this.showResult(runner.playPersonVsComputer(gesture)))
          .catch(() => this.showGameChanger());
      });
    document
      .getElementById('gameComputerVsComputer')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.showLoading()
          .then(() => this.showResult(runner.playComputerVsComputer()))
          .catch(() => this.showGameChanger());
      });
    document
      .getElementById('reset')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.showGameChanger();
      });
  }

  mapInterface() {
    this.chooseGamePage = document.getElementById('chooseGame');
    this.chooseGesturePage = document.getElementById('chooseGesture');
    this.loadingPage = document.getElementById('loading');
    this.resultPage = document.getElementById('result');
  }

  showLoading() {
    this.setDisplayOnClass('rps', 'none');
    this.loadingPage.style.display = 'block';

    return new Promise(resolve => setTimeout(resolve, 3000));
  }

  showResult(results) {
    this.setDisplayOnClass('rps', 'none');
    this.resultPage.style.display = 'block';

    this.setDisplayOnClass('result__output', 'none');
    this.setDisplayOnClass('result__image', 'none');
    this.setDisplayOnClass(`result__image--left-${results.gesture1.constructor.name.toLowerCase()}`, 'block');
    this.setDisplayOnClass(`result__image--right-${results.gesture2.constructor.name.toLowerCase()}`, 'block');

    let resultId;
    switch (results.result) {
      case constants.RESULT_DRAW:
        resultId = 'resultDraw';
        break;
      case constants.RESULT_WIN:
        resultId = 'resultWin';
        break;
      case constants.RESULT_LOSE:
        resultId = 'resultLose';
        break;
      default:
        break;
    }

    document.getElementById(resultId).style.display = 'flex';
  }

  setDisplayOnClass(className, display) { // eslint-disable-line class-methods-use-this
    const elements = document.getElementsByClassName(className);
    // eslint-disable-next-line no-param-reassign, function-paren-newline
    Array.prototype.map.call(elements, (element) => { element.style.display = display; });
  }

  showGameChanger() {
    this.setDisplayOnClass('rps', 'none');
    this.chooseGamePage.style.display = 'block';
  }

  showGestureChooser() {
    this.setDisplayOnClass('rps', 'none');
    this.chooseGesturePage.style.display = 'block';

    return new Promise((resolve) => {
      const choices = document.getElementsByClassName('choose__choice');
      const listeners = Array.prototype.map.call(choices, element => element.addEventListener('click', () => {
        Array.prototype.map.call(choices, (ele, index) => {
          // eslint-disable-next-line security/detect-object-injection
          ele.removeEventListener('click', listeners[index]);
        });
        resolve(element.id.toLowerCase().replace('choose', ''));
      }));
    });
  }
}

module.exports = {
  run: () => (new App()).init(),
};
