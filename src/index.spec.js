'use strict';

const app = require('./app/index');

describe('<index>', () => {
  app.run = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('run not called', () => {
    require('./index'); // eslint-disable-line global-require
    expect(app.run).not.toBeCalled(); // eslint-disable-line no-console
  });

  it('run called', () => {
    require('./index'); // eslint-disable-line global-require
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(app.run).toBeCalled(); // eslint-disable-line no-console
  });
});
