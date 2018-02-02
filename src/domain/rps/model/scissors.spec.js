'use strict';

const Gesture = require('./gesture.interface');
const Paper = require('./paper');
const Rock = require('./rock');
const Scissors = require('./scissors');
const constants = require('../constants');

class Test extends Gesture {}

describe('Scissors', () => {
  const scissors = new Scissors();
  test('has Class Gesture', () => {
    expect(scissors).toBeInstanceOf(Gesture);
  });

  test('fail when call to Gesture->getResult', () => {
    expect(scissors.getResult)
      .toThrow(new Error('Gesture unexpected type'));
  });

  test('Test when call to getResult with rock', () => {
    expect(scissors.getResult(new Rock())).toEqual(constants.RESULT_LOSE);
  });

  test('Test when call to getResult with paper', () => {
    expect(scissors.getResult(new Paper())).toEqual(constants.RESULT_WIN);
  });

  test('Test when call to getResult with scissors', () => {
    expect(scissors.getResult(new Scissors())).toEqual(constants.RESULT_DRAW);
  });

  test('Test when call to getResult with Test', () => {
    expect(() => scissors.getResult(new Test()))
      .toThrow(new Error('Gesture unexpected type, Test'));
  });
});
