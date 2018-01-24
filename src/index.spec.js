'use strict';

describe('<index>', () => {
  global.console = {
    log: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls console', () => {
    require('./index'); // eslint-disable-line global-require
    expect(console.log).toBeCalled(); // eslint-disable-line no-console
  });
});
