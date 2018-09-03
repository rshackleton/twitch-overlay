/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DonationStream, DonationWithMessage } from 'components';

import audioCheer from '../../audio/pirate-cheer.mp3';
import audioDiablo from '../../audio/el-pollo-diablo.mp3';
import audioLaugh from '../../audio/murray-laugh.mp3';

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

  audioRefs = [];

  notifications = [
    { name: 'diablo', min: 20, src: audioDiablo },
    { name: 'laugh', min: 10, src: audioLaugh },
    { name: 'cheer', min: 0, src: audioCheer },
  ];

  componentDidUpdate(prevProps) {
    const { latestDonation } = this.props;
    const { latestDonation: oldDonation } = prevProps;

    if (latestDonation && oldDonation && latestDonation.externalId !== oldDonation.externalId) {
      this.playNotificationSound(latestDonation);
    }
  }

  playNotificationSound(donation) {
    const notification = this.notifications.find(n => n.min <= donation.donorLocalAmount);
    const audio = this.audioRefs[notification.name];
    audio.play();
  }

  renderAudio() {
    return this.notifications.map(notification => (
      <audio
        key={notification.name}
        preload="auto"
        src={notification.src}
        ref={c => {
          this.audioRefs[notification.name] = c;
        }}
      />
    ));
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
          {this.renderAudio()}
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
