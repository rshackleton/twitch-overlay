/* eslint-disable jsx-a11y/media-has-caption */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { DonationStream, DonationWithMessage } from 'components';

import audioDiablo from '../../audio/el-pollo-diablo.mp3';
import audioLaugh from '../../audio/murray-laugh.mp3';
import audioIntro from '../../audio/theme-intro.mp3';

const donationShape = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  donorDisplayName: PropTypes.string.isRequired,
});

class DonationsNotifications extends Component {
  static propTypes = {
    latestDonation: donationShape,
  };

  static defaultProps = {
    latestDonation: null,
  };

  audioRefs = [];

  notifications = [
    { name: 'cheer', min: 20, src: audioIntro },
    { name: 'diablo', min: 10, src: audioDiablo },
    { name: 'laugh', min: 0, src: audioLaugh },
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
    const { latestDonation } = this.props;
    if (latestDonation) {
      return (
        <DonationWithMessage
          key={latestDonation.externalId}
          donation={latestDonation}
          title="New Donation"
        />
      );
    }
    return null;
  }

  render() {
    return (
      <DonationStream>
        <Fragment>
          {this.renderAudio()}
          {this.renderDonation()}
        </Fragment>
      </DonationStream>
    );
  }
}

const mapStateToProps = state => ({
  latestDonation: state.donations.latest,
});

export default connect(mapStateToProps)(DonationsNotifications);
