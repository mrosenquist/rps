'use strict';

const Runner = require('./Runner');
const Gesture = require('./model/gesture.interface');
const Rock = require('./model/rock');
const constant = require('./constants');

const runner = new Runner();

describe('Runner', () => {
  test('Check getGestures', () => {
    expect(runner.getGestures().length).toEqual(3);
  });

  test('Check getComputerGesture', () => {
    expect(runner.getComputerGesture()).toBeInstanceOf(Gesture);
  });

  test('Check playComputerVsComputer', () => {
    expect(Object.keys(runner.playComputerVsComputer())).toEqual(['gesture1', 'gesture2', 'result']);
  });

  test('Check playPersonVsComputer with Instance of Rock', () => {
    expect(Object.keys(runner.playPersonVsComputer(new Rock()))).toEqual(['gesture1', 'gesture2', 'result']);
  });

  test('Check playPersonVsComputer with string of rock', () => {
    expect(Object.keys(runner.playPersonVsComputer('rock'))).toEqual(['gesture1', 'gesture2', 'result']);
  });

  test('Check playPersonVsComputer with string of paper', () => {
    expect(Object.keys(runner.playPersonVsComputer('paper'))).toEqual(['gesture1', 'gesture2', 'result']);
  });

  test('Check playPersonVsComputer with string of scissors', () => {
    expect(Object.keys(runner.playPersonVsComputer('scissors'))).toEqual(['gesture1', 'gesture2', 'result']);
  });

  test('Check play', () => {
    expect(runner.play(new Rock(), new Rock())).toEqual(constant.RESULT_DRAW);
  });
});
