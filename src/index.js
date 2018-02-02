'use strict';

const app = require('./app/index');

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    app.run('rsp');
  });
})();
