/* global API_HOST:false, API_PROTOCOL:false */
import { Component } from 'react';
import { connect } from 'react-redux';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/filter';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import { fetchDonationsFulfilled, streamDonationsFulfilled } from 'actions';

class DonationStream extends Component {
  static propTypes = {
    addDonations: PropTypes.func.isRequired,
    addNewDonations: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  };
  componentDidMount() {
    this.stream = this.createStream().subscribe(donations => this.props.addNewDonations(donations));
  }
  componentWillUnmount() {
    this.stream.unsubscribe();
  }
  createStream() {
    this.socket = io(`${API_PROTOCOL}://${API_HOST}`);

    this.socket.on('existing-donations', (update) => {
      this.props.addDonations(update);
    });

    const observable = new Observable((observer) => {
      this.socket.on('new-donation', (update) => {
        observer.next(update.new_val);
      });
      return () => {
        this.socket.close();
      };
    });

    return observable.bufferTime(500).filter(donations => donations && donations.length);
  }
  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = dispatch => ({
  addDonations: donations => dispatch(fetchDonationsFulfilled(donations)),
  addNewDonations: donations => dispatch(streamDonationsFulfilled(donations)),
});

export default connect(
  null,
  mapDispatchToProps,
)(DonationStream);
