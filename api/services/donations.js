const logger = require('./logger');
const models = require('../models');

function all() {
  return models.Donation.find()
    .catch((err) => {
      logger.error(err);
      return null;
    });
}

module.exports = { all };
