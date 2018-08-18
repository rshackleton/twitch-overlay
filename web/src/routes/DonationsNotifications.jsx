/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DonationWithMessage } from 'components';

import audioFairground from '../audio/fairground.mp3';
import audioWow from '../audio/wow.mp3';

const notifications = [{ min: 20, src: audioFairground }, { min: 0, src: audioWow }];

const donationShape = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  donorDisplayName: PropTypes.string.isRequired,
});

class DonationsNotifications extends Component {
  static propTypes = {
    newDonation: donationShape,
    topDonation: donationShape,
  };
  static defaultProps = {
    newDonation: null,
    topDonation: null,
  };
  componentDidUpdate(prevProps) {
    const { newDonation } = this.props;
    const { oldDonation } = prevProps;

    if (newDonation && (!oldDonation || newDonation.externalId !== oldDonation.externalId)) {
      this.playNotificationSound(newDonation);
    }
  }
  playNotificationSound(donation) {
    this.audio.src = notifications.find(n => n.min <= donation.amount).src;
    this.audio.play();
  }
  renderDonation() {
    const { newDonation, topDonation } = this.props;
    if (newDonation) {
      return (
        <DonationWithMessage
          key={newDonation.externalId}
          title="New Donation"
          donation={newDonation}
        />
      );
    } else if (topDonation) {
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
      <div>
        <audio
          ref={(c) => {
            this.audio = c;
          }}
        />
        {this.renderDonation()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  newDonation: state.donations.new,
  topDonation: state.donations.top,
});

export default connect(mapStateToProps)(DonationsNotifications);
