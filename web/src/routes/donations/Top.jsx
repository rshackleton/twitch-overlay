import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DonationStream, DonationWithMessage } from 'components';

const donationShape = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  donorDisplayName: PropTypes.string.isRequired,
});

class DonationsNotifications extends Component {
  static propTypes = {
    topDonation: donationShape,
  };

  static defaultProps = {
    topDonation: null,
  };

  renderDonation() {
    const { topDonation } = this.props;
    if (topDonation) {
      return (
        <DonationWithMessage
          key={topDonation.externalId}
          donation={topDonation}
          title="Top Donation"
        />
      );
    }
    return null;
  }

  render() {
    return <DonationStream>{this.renderDonation()}</DonationStream>;
  }
}

const mapStateToProps = state => ({
  topDonation: state.donations.top,
});

export default connect(mapStateToProps)(DonationsNotifications);
