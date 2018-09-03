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
    height: PropTypes.number.isRequired,
    topDonation: donationShape,
    width: PropTypes.number.isRequired,
  };

  static defaultProps = {
    topDonation: null,
  };

  renderDonation() {
    const { height, topDonation, width } = this.props;
    if (topDonation) {
      return (
        <DonationWithMessage
          key={topDonation.externalId}
          donation={topDonation}
          height={height}
          title="Top Donation"
          width={width}
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
