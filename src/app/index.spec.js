'use strict';

const app = require('./index');

document.getElementById = jest.fn(() => ({
  addEventListener: jest.fn(),
  style: {
    display: '',
  },
}));

describe('app', () => {
  let App;
  test('', () => {
    App = app.run();
  });

  test('', () => {
    App.showLoading();
  });

  test('', () => {
    App.showGameChanger();
  });

  test('', () => {
    App.showGestureChooser();
  });

  test('', () => {
    App.showResult('');
  });
});
