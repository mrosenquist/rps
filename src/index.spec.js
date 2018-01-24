'use strict';

describe('<index>', () => {
  global.console = {
    log: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls console', () => {
    expect(console.log).toBeCalled();
  });
});
