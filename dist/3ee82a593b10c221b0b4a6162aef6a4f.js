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
})({20:[function(require,module,exports) {
'use strict';

class Gesture {
  getResult(gesture) { // eslint-disable-line class-methods-use-this
    throw new Error(`Not implemented, ${gesture} ignored`);
  }
}

module.exports = Gesture;

},{}],16:[function(require,module,exports) {
'use strict';

module.exports = {
  RESULT_DRAW: 0,
  RESULT_WIN: 1,
  RESULT_LOSE: -1,
};

},{}],17:[function(require,module,exports) {
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

},{"./gesture.interface":20,"../constants":16}],18:[function(require,module,exports) {
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

},{"./gesture.interface":20,"../constants":16}],19:[function(require,module,exports) {
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

},{"./gesture.interface":20,"../constants":16}],15:[function(require,module,exports) {
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

},{"./model/paper":17,"./model/rock":18,"./model/scissors":19}],13:[function(require,module,exports) {
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

},{"../domain/rps/Runner":15,"../domain/rps/constants":16}],2:[function(require,module,exports) {
'use strict';

const app = require('./app/index');

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    app.run('rsp');
  });
})();

},{"./app/index":13}],21:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var ws = new WebSocket('ws://' + hostname + ':' + '52875' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[21,2])
//# sourceMappingURL=/dist/3ee82a593b10c221b0b4a6162aef6a4f.map