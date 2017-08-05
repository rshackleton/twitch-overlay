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

/** Insert new donation. */
function retrieveDonation(id) {
  // Use existing connection.
  return connection
    .then((conn) => {
      // Insert new item into table.
      return r
        .db(RETHINK_DB_NAME)
        .table(RETHINK_TABLE_NAME)
        .filter(r.row('externalId').eq(id))
        .limit(1)
        .run(conn)
        .then((cursor) => {
          // Get array result.
          return cursor.toArray();
        });
    });
}

/** Insert new donation. */
function insertDonation(donation) {
  // Use existing connection.
  return connection
    .then((conn) => {
      // Insert new item into table.
      return r
        .db(RETHINK_DB_NAME)
        .table(RETHINK_TABLE_NAME)
        .insert(donation)
        .run(conn);
    });
}

module.exports = {
  initialise,
  retrieveDonation,
  insertDonation,
};
