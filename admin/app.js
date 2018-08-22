/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development') {
  module.exports = require('./app.dev.js');
} else {
  module.exports = require('./app.prd.js');
}
