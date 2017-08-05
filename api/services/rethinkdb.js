const r = require('rethinkdb');

const logger = require('./logger');

const RETHINK_HOST = 'rethinkdb';
const RETHINK_PORT = 28015;
const RETHINK_DB_NAME = 'twitch_overlay';
const RETHINK_TABLE_NAME = 'donations';

// Create initial connection.
const connection = r.connect({ host: RETHINK_HOST, port: RETHINK_PORT })
  .then(conn => {
    logger.debug(`Connected to ${RETHINK_HOST}:${RETHINK_PORT}`);
    return conn;
  })
  .error(err => logger.error(err));

/** Create db and table if required. */
function initialise() {
  // Use existing connection.
  return connection.then((conn) => {
    // Get db list.
    return r
      .dbList()
      .run(conn)
      .then(res => {
        // Check if db already exists.
        if (res.includes(RETHINK_DB_NAME)) {
          return true;
        }

        // Create db.
        return r
          .dbCreate(RETHINK_DB_NAME)
          .run(conn)
          .then(res => {
            // Create table.
            return r
              .db(RETHINK_DB_NAME)
              .tableCreate(RETHINK_TABLE_NAME)
              .run(conn);
          });
      });
  });
}

/** Retrieve donations stream. */
function streamDonations() {
  return connection
    .then((conn) => {
      return r
        .db(RETHINK_DB_NAME)
        .table(RETHINK_TABLE_NAME)
        .changes()
        .run(conn);
    });
}

/** Retrieve single donation. */
function retrieveDonation(id) {
  return connection
    .then((conn) => {
      return r
        .db(RETHINK_DB_NAME)
        .table(RETHINK_TABLE_NAME)
        .filter(r.row('externalId').eq(id))
        .limit(1)
        .run(conn)
        .then((cursor) => {
          return cursor.toArray();
        });
    });
}

/** Retrieve all donations. */
function retrieveDonations() {
  return connection
    .then((conn) => {
      return r
        .db(RETHINK_DB_NAME)
        .table(RETHINK_TABLE_NAME)
        .orderBy(r.desc('donationDate'))
        .run(conn)
        .then((cursor) => {
          return cursor.toArray();
        });
    });
}

/** Insert new donation. */
function insertDonation(donation) {
  return connection
    .then((conn) => {
      return r
        .db(RETHINK_DB_NAME)
        .table(RETHINK_TABLE_NAME)
        .insert(donation)
        .run(conn);
    });
}

module.exports = {
  initialise,
  insertDonation,
  retrieveDonation,
  retrieveDonations,
  streamDonations,
};
