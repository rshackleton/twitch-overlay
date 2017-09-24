import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DonationWithMessage } from 'components';

const DonationsNotifications = ({ topDonation }) => (
  topDonation ?
    <DonationWithMessage
      title="Top Donation"
      donation={topDonation}
    /> : null
);

DonationsNotifications.defaultProps = {
  topDonation: null,
};

DonationsNotifications.propTypes = {
  topDonation: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    donorDisplayName: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({
  topDonation: state.donations.top,
});

export default connect(mapStateToProps)(DonationsNotifications);
