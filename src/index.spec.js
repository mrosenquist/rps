'use strict';

global.console = {
  log: jest.fn(),
};

expect(console.log).toBeCalled();
