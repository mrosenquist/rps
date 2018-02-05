'use strict';

const Gesture = require('./gesture.interface');
const Paper = require('./paper');
const Rock = require('./rock');
const Scissors = require('./scissors');
const constants = require('../constants');

class Test extends Gesture {}

describe('Paper', () => {
  const paper = new Paper();
  test('has Class Gesture', () => {
    expect(paper).toBeInstanceOf(Gesture);
  });

  test('fail when call to Gesture->getResult', () => {
    expect(paper.getResult)
      .toThrow(new Error('Gesture unexpected type'));
  });

  test('Test when call to getResult with rock', () => {
    expect(paper.getResult(new Rock())).toEqual(constants.RESULT_WIN);
  });

  test('Test when call to getResult with paper', () => {
    expect(paper.getResult(new Paper())).toEqual(constants.RESULT_DRAW);
  });

  test('Test when call to getResult with scissors', () => {
    expect(paper.getResult(new Scissors())).toEqual(constants.RESULT_LOSE);
  });

  test('Test when call to getResult with Test', () => {
    expect(() => paper.getResult(new Test()))
      .toThrow(new Error('Gesture unexpected type, Test'));
  });
});
