const mongoose = require('mongoose');
const winston = require('winston');
mongoose.Promise = global.Promise;

const host = process.env.MONGO_PORT_27017_TCP_ADDR || 'mongo';
const port = process.env.MONGO_PORT_27017_TCP_PORT || 27017;
const dbName = 'donations';

const mongoUri = `mongodb://${host}:${port}/${dbName}`;

winston.info(`Connecting to ${mongoUri}`);

mongoose.connect(mongoUri, { useMongoClient: true });

var donationSchema = mongoose.Schema({
  externalId: { type: Number, index: true },
  amount: Number,
  currencyCode: String,
  donationDate: Date,
  donorDisplayName: String,
  donorLocalAmount: Number,
  donorLocalCurrencyCode: String,
  message: String,
});

var Donation = mongoose.model('Donation', donationSchema);

function saveDonation(data) {
  // Check for existing donation.
  return Donation.findOne({ externalId: data.externalId }).then(
    (doc) => {
      if (doc) {
        winston.info(`Donation ${data.externalId} already exists`);
        return null;
      }
      // Create donation model.
      var donation = new Donation(data);

      // Save to mongodb.
      return donation.save()
        .then((donation) => {
          winston.info(`Saved donation ${donation.externalId}`);
          return donation;
        })
        .catch((err) => {
          winston.error(err);
          return err;
        });
    },
    (err) => {
      winston.info(err);
      return null;
    }
  );
}

module.exports = { saveDonation };
