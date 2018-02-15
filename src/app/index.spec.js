'use strict';

const app = require('./index');
const Paper = require('../domain/rps/model/paper');
const constant = require('../domain/rps/constants');

let App;
let promises = [];
const preventDefault = jest.fn();
const getAttribute = jest.fn(() => 'boy1');
const addEventListener = jest.fn((type, callback) => {
  const out = callback({
    preventDefault,
    currentTarget: {
      getAttribute,
    },
  });
  if (out instanceof Promise) {
    promises.push(out);
  }
  return out;
});
const ele = {
  addEventListener,
  removeEventListener: jest.fn(),
  style: {
    display: '',
  },
  'class': '', // eslint-disable-line quote-props
  id: '123',
  getAttribute: jest.fn(),
};
document.getElementById = jest.fn(() => (ele));
document.getElementsByClassName = jest.fn(() => ([ele]));
document.querySelectorAll = jest.fn(() => ([ele]));

describe('app', () => {
  afterEach(() => {
    jest.clearAllMocks();
    promises = [];
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('run Init', () => {
    App = app.run();
    expect(document.getElementById).toHaveBeenCalledTimes(7);
  });

  test('hookEvent', (done) => {
    App.hookEvents();
    expect(sessionStorage.setItem).toHaveBeenCalledWith('player1Avatar', 'boy1');
    expect(addEventListener).toHaveBeenCalledTimes(5);
    Promise.all(promises).then(() => { done(); });
  });

  describe('Interface Changes', () => {
    beforeAll(() => {
      App.setDisplayOnClass = jest.fn();
    });
    test('showLoading', () => {
      expect(App.showLoading()).toBeInstanceOf(Promise);
      expect(App.setDisplayOnClass).toBeCalled();
    });

    test('showGameChanger', () => {
      expect(App.showGameChanger()).toEqual(undefined);
      expect(App.setDisplayOnClass).toBeCalled();
    });

    test('showGestureChooser()', (done) => {
      App.showLoading = jest.fn(() => Promise.resolve());
      App.showGestureChooser().then(() => {
        done();
      });
    });

    describe('showResult', () => {
      test('showResult draw', () => {
        App.showResult({
          gesture1: new Paper(),
          gesture2: new Paper(),
          result: constant.RESULT_DRAW,
        });
        expect(document.getElementById).toHaveBeenCalledWith('resultDraw');
      });

      test('showResult win', () => {
        App.showResult({
          gesture1: new Paper(),
          gesture2: new Paper(),
          result: constant.RESULT_WIN,
        });
        expect(document.getElementById).toHaveBeenCalledWith('resultWin');
      });

      test('showResult lose', () => {
        App.showResult({
          gesture1: new Paper(),
          gesture2: new Paper(),
          result: constant.RESULT_LOSE,
        });
        expect(document.getElementById).toHaveBeenCalledWith('resultLose');
      });

      test('showResult undefined', () => {
        expect(() => {
          App.showResult({
            gesture1: new Paper(),
            gesture2: new Paper(),
            result: 'awdwa',
          });
        }).toThrowError();
        expect(document.getElementById).not.toBeCalled();
      });
    });
  });

  describe('Fail', () => {
    test('showGestureChooser', (done) => {
      App.showGestureChooser = jest.fn(() => Promise.reject());
      App.showGameChanger = jest.fn();
      App.hookEvents();
      Promise.all(promises).then(() => {
        expect(App.showGameChanger).toHaveBeenCalledTimes(2);
        done();
      });
    });

    test('showGestureChooser', (done) => {
      App.showLoading = jest.fn(() => Promise.reject());
      App.showGameChanger = jest.fn();
      App.hookEvents();
      Promise.all(promises).then(() => {
        expect(App.showGameChanger).toHaveBeenCalledTimes(3);
        done();
      });
    });
  });
});
