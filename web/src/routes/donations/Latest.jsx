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
    height: PropTypes.number.isRequired,
    latestDonation: donationShape,
    width: PropTypes.number.isRequired,
  };

  static defaultProps = {
    latestDonation: null,
  };

  componentDidUpdate(prevProps) {
    const { latestDonation } = this.props;
    const { latestDonation: oldDonation } = prevProps;

    if (latestDonation && oldDonation && latestDonation.externalId !== oldDonation.externalId) {
      this.playNotificationSound(latestDonation);
    }
  }

  playNotificationSound(donation) {
    this.audio.src = notifications.find(n => n.min <= donation.amount).src;
    this.audio.play();
  }

  renderDonation() {
    const { height, latestDonation, width } = this.props;
    if (latestDonation) {
      return (
        <DonationWithMessage
          key={latestDonation.externalId}
          donation={latestDonation}
          height={height}
          title="New Donation"
          width={width}
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
  latestDonation: state.donations.latest,
});

export default connect(mapStateToProps)(DonationsNotifications);
