'use strict';

class Gesture {
  getResult(gesture) { // eslint-disable-line class-methods-use-this
    throw new Error(`Not implemented, ${gesture} ignored`);
  }
}

module.exports = Gesture;
