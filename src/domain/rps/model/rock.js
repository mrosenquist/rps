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
