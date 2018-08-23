/* eslint-disable global-require */
require('dotenv').config();

require('babel-register')({
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
});

module.exports = require('./app.js');
