const Rx = require('rxjs');
const createObservable = require('rethinkdb-observable')
const logger = require('./logger');
const db = require('./rethinkdb');

function all() {
  return db.initialise()
    .then(() => db.retrieveDonations())
    .catch((err) => {
      logger.error(err.message);
      return err;
    });
}

function stream() {
  return db.initialise()
    .then(() => db.streamDonations())
    .then((cursor) => createObservable(cursor));
}

module.exports = {
  all,
  stream,
};
