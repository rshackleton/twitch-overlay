const mongoose = require('mongoose');
const logger = require('../services/logger');

mongoose.Promise = global.Promise;

const host = process.env.MONGO_PORT_27017_TCP_ADDR || 'mongo';
const port = process.env.MONGO_PORT_27017_TCP_PORT || 27017;
const dbName = 'donations';
const mongoUri = `mongodb://${host}:${port}/${dbName}`;

logger.debug(`Connecting to ${mongoUri}`);
mongoose.connect(mongoUri, { useMongoClient: true });
mongoose.connection.on('connected', () => logger.debug(`Connected to ${mongoUri}`));
mongoose.connection.on('error', (err) => logger.error(err));

const Donation = require('./Donation');

module.exports = { Donation };
