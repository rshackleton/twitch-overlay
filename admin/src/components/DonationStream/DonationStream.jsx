/* global API_HOST:false, API_PROTOCOL:false */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/filter';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import {
  fetchDonations,
  streamDonationsFulfilled,
} from 'actions';

import { DonationList } from 'components';

class DonationStream extends Component {
  static propTypes = {
    donations: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchDonations: PropTypes.func.isRequired,
    newDonations: PropTypes.func.isRequired,
  }
  static defaultProps = {
    donations: [],
  }
  componentWillMount() {
    this.props.fetchDonations();
  }
  componentDidMount() {
    this.stream = this.createStream().subscribe(
      donations => this.props.newDonations(donations),
    );
  }
  componentWillUnmount() {
    this.stream.unsubscribe();
  }
  createStream() {
    const observable = new Observable((observer) => {
      this.socket = io(`${API_PROTOCOL}://${API_HOST}`);
      this.socket.on('donation', (update) => {
        observer.next(update.new_val);
      });
      return () => {
        this.socket.close();
      };
    });

    return observable
      .bufferTime(500)
      .filter(donations => donations && donations.length);
  }
  render() {
    const { donations } = this.props;
    return <DonationList donations={donations} />;
  }
}

const mapStateToProps = state => ({
  donations: state.donations,
});

const mapDispatchToProps = dispatch => ({
  fetchDonations: () => dispatch(fetchDonations()),
  newDonations: donations => dispatch(streamDonationsFulfilled(donations)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DonationStream);
