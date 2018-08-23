/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DonationStream, DonationWithMessage } from 'components';

import audioFairground from '../../audio/fairground.mp3';
import audioWow from '../../audio/wow.mp3';

const notifications = [{ min: 20, src: audioFairground }, { min: 0, src: audioWow }];

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

  playNotificationSound(donation) {
    this.audio.src = notifications.find(n => n.min <= donation.amount).src;
    this.audio.play();
  }

  renderDonation() {
    const { topDonation } = this.props;
    if (topDonation) {
      return (
        <DonationWithMessage
          key={topDonation.externalId}
          title="Top Donation"
          donation={topDonation}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <DonationStream>
        <div>
          <audio
            ref={c => {
              this.audio = c;
            }}
          />
          {this.renderDonation()}
        </div>
      </DonationStream>
    );
  }
}

const mapStateToProps = state => ({
  topDonation: state.donations.top,
});

export default connect(mapStateToProps)(DonationsNotifications);
