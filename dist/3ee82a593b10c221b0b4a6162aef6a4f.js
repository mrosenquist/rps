// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({18:[function(require,module,exports) {
'use strict';

class Gesture {
  getResult(gesture) { // eslint-disable-line class-methods-use-this
    throw new Error(`Not implemented, ${gesture} ignored`);
  }
}

module.exports = Gesture;

},{}],13:[function(require,module,exports) {
'use strict';

module.exports = {
  RESULT_DRAW: 0,
  RESULT_WIN: 1,
  RESULT_LOSE: -1,
};

},{}],15:[function(require,module,exports) {
'use strict';

const Gesture = require('./gesture.interface');
const constants = require('../constants');

class Paper extends Gesture {
  getResult(gesture) { // eslint-disable-line class-methods-use-this
    if (!(gesture instanceof Gesture)) {
      throw new Error('Gesture unexpected type');
    }
    switch (gesture.constructor.name) {
      case 'Rock':
        return constants.RESULT_WIN;
      case 'Paper':
        return constants.RESULT_DRAW;
      case 'Scissors':
        return constants.RESULT_LOSE;
      default:
        throw new Error(`Gesture unexpected type, ${gesture.constructor.name}`);
    }
  }
}

module.exports = Paper;

},{"./gesture.interface":18,"../constants":13}],16:[function(require,module,exports) {
'use strict';

const Gesture = require('./gesture.interface');
const constants = require('../constants');

class Rock extends Gesture {
  getResult(gesture) { // eslint-disable-line class-methods-use-this
    if (!(gesture instanceof Gesture)) {
      throw new Error('Gesture unexpected type');
    }
    switch (gesture.constructor.name) {
      case 'Rock':
        return constants.RESULT_DRAW;
      case 'Paper':
        return constants.RESULT_LOSE;
      case 'Scissors':
        return constants.RESULT_WIN;
      default:
        throw new Error(`Gesture unexpected type, ${gesture.constructor.name}`);
    }
  }
}

module.exports = Rock;

},{"./gesture.interface":18,"../constants":13}],17:[function(require,module,exports) {
'use strict';

const Gesture = require('./gesture.interface');
const constants = require('../constants');

class Scissors extends Gesture {
  getResult(gesture) { // eslint-disable-line class-methods-use-this
    if (!(gesture instanceof Gesture)) {
      throw new Error('Gesture unexpected type');
    }
    switch (gesture.constructor.name) {
      case 'Rock':
        return constants.RESULT_LOSE;
      case 'Paper':
        return constants.RESULT_WIN;
      case 'Scissors':
        return constants.RESULT_DRAW;
      default:
        throw new Error(`Gesture unexpected type, ${gesture.constructor.name}`);
    }
  }
}

module.exports = Scissors;

},{"./gesture.interface":18,"../constants":13}],14:[function(require,module,exports) {
'use strict';

const Paper = require('./model/paper');
const Rock = require('./model/rock');
const Scissors = require('./model/scissors');

class Runner {
  constructor() {
    this.gestures = [
      new Paper(),
      new Rock(),
      new Scissors(),
    ];
  }

  getGestures() {
    return this.gestures;
  }

  getComputerGesture() {
    const index = Math.floor(Math.random() * this.gestures.length);
    // eslint-disable-next-line security/detect-object-injection
    return this.gestures[index];
  }

  playComputerVsComputer() {
    const gesture1 = this.getComputerGesture();
    const gesture2 = this.getComputerGesture();

    return {
      gesture1,
      gesture2,
      result: this.play(gesture1, gesture2),
    };
  }

  playPersonVsComputer(gesture1Input) {
    let gesture1;
    const gesture2 = this.getComputerGesture();
    switch (gesture1Input) {
      case 'paper':
        gesture1 = new Paper();
        break;
      case 'rock':
        gesture1 = new Rock();
        break;
      case 'scissors':
        gesture1 = new Scissors();
        break;
      default:
        gesture1 = gesture1Input;
        break;
    }

    return {
      gesture1,
      gesture2,
      result: this.play(gesture1, gesture2),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  play(gesture1, gesture2) {
    return gesture1.getResult(gesture2);
  }
}

module.exports = Runner;

},{"./model/paper":15,"./model/rock":16,"./model/scissors":17}],12:[function(require,module,exports) {
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

},{"../domain/rps/Runner":14,"../domain/rps/constants":13}],2:[function(require,module,exports) {
'use strict';

const app = require('./app/index');

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    app.run('rsp');
  });
})();

},{"./app/index":12}]},{},[2])