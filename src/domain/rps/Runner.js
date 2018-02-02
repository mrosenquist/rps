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
