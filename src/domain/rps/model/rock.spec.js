'use strict';

const Gesture = require('./gesture.interface');
const Paper = require('./paper');
const Rock = require('./rock');
const Scissors = require('./scissors');
const constants = require('../constants');

class Test extends Gesture {}

describe('Rock', () => {
  const rock = new Rock();
  test('has Class Gesture', () => {
    expect(rock).toBeInstanceOf(Gesture);
  });

  test('fail when call to Gesture->getResult', () => {
    expect(rock.getResult)
      .toThrow(new Error('Gesture unexpected type'));
  });

  test('Test when call to getResult with rock', () => {
    expect(rock.getResult(new Rock())).toEqual(constants.RESULT_DRAW);
  });

  test('Test when call to getResult with paper', () => {
    expect(rock.getResult(new Paper())).toEqual(constants.RESULT_LOSE);
  });

  test('Test when call to getResult with scissors', () => {
    expect(rock.getResult(new Scissors())).toEqual(constants.RESULT_WIN);
  });

  test('Test when call to getResult with Test', () => {
    expect(() => rock.getResult(new Test()))
      .toThrow(new Error('Gesture unexpected type, Test'));
  });
});
