/* global API_HOST:false, API_PROTOCOL:false */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/filter';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import { fetchDonationsFulfilled, streamDonationsFulfilled, updateDonations } from 'actions';

import { DonationList, DonationNotification } from 'components';

class DonationStream extends Component {
  static propTypes = {
    addDonations: PropTypes.func.isRequired,
    addNewDonations: PropTypes.func.isRequired,
    donations: PropTypes.arrayOf(PropTypes.object).isRequired,
    newCount: PropTypes.number.isRequired,
    refresh: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { addNewDonations } = this.props;
    this.stream = this.createStream().subscribe(donations => addNewDonations(donations));
  }

  componentWillUnmount() {
    this.stream.unsubscribe();
  }

  createStream() {
    const { addDonations } = this.props;
    this.socket = io(`${API_PROTOCOL}://${API_HOST}`);

    this.socket.on('existing-donations', update => {
      addDonations(update);
    });

    const observable = new Observable(observer => {
      this.socket.on('new-donation', update => {
        observer.next(update.new_val);
      });
      return () => {
        this.socket.close();
      };
    });

    return observable.bufferTime(500).filter(donations => donations && donations.length);
  }

  render() {
    const { donations, newCount, refresh } = this.props;
    return (
      <div>
        <DonationNotification newCount={newCount} refresh={() => refresh()} />
        <DonationList donations={donations} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  donations: state.donations.items || [],
  newCount: state.donations.newItems.length,
  newDonations: state.donations.newItems,
});

const mapDispatchToProps = dispatch => ({
  addDonations: donations => dispatch(fetchDonationsFulfilled(donations)),
  addNewDonations: donations => dispatch(streamDonationsFulfilled(donations)),
  refresh: () => dispatch(updateDonations()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DonationStream);
