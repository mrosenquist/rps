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
    this.mapInterface();
    this.hookEvents();
    this.showGameChanger();
    return this;
  }

  hookEvents() {
    const self = this;
    document
      .getElementById('gamePlayerVsComputer')
      .addEventListener('click', (event) => {
        event.preventDefault();
        return self.showGestureChooser()
          .then(gesture => Promise.all([gesture, self.showLoading()]))
          .then(([gesture]) => self.showResult(runner.playPersonVsComputer(gesture)))
          .catch(() => self.showGameChanger());
      });
    document
      .getElementById('gameComputerVsComputer')
      .addEventListener('click', (event) => {
        event.preventDefault();
        return self.showLoading()
          .then(() => self.showResult(runner.playComputerVsComputer()))
          .catch(() => self.showGameChanger());
      });
    document
      .getElementById('reset')
      .addEventListener('click', (event) => {
        event.preventDefault();
        self.showGameChanger();
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
        throw new Error('Bad result');
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
      let listeners = [];
      listeners = Array.prototype.map.call(choices, element => element.addEventListener('click', () => {
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
