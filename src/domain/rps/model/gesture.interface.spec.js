'use strict';

const GestureInterface = require('./gesture.interface');

describe('GestureInterface', () => {
  test('has Class GestureInterface', () => {
    expect(new GestureInterface()).toBeInstanceOf(GestureInterface);
  });

  test('call to GestureInterface->getResult', () => {
    expect((new GestureInterface()).getResult)
      .toThrow(new Error('Not implemented, undefined ignored'));
  });
});
