const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
  externalId: { type: Number, index: true },
  amount: Number,
  currencyCode: String,
  donationDate: Date,
  donorDisplayName: String,
  donorLocalAmount: Number,
  donorLocalCurrencyCode: String,
  message: String,
});

module.exports = mongoose.model('Donation', donationSchema);
