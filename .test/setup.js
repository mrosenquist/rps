'use strict';

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
//
// function copyProps(src, target) {
//   const props = Object.getOwnPropertyNames(src)
//     .filter(prop => typeof target[prop] === 'undefined')
//     .reduce((result, prop) => (Object.assign(result, {
//       [prop]: Object.getOwnPropertyDescriptor(src, prop),
//     }), {}));
//   Object.defineProperties(target, props);
// }


global.window = window;
global.sessionStorage = {
  setItem: jest.fn(),
};
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.Event = window.Event;
//copyProps(window, global);
