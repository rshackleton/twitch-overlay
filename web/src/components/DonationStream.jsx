/* global API_HOST:false, API_PROTOCOL:false */
import { Component } from 'react';
import { connect } from 'react-redux';
import { Observable } from 'rxjs';
import { bufferTime, filter } from 'rxjs/operators';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import { fetchDonationsFulfilled, streamDonationsFulfilled } from 'actions';

class DonationStream extends Component {
  static propTypes = {
    addDonations: PropTypes.func.isRequired,
    addNewDonations: PropTypes.func.isRequired,
    children: PropTypes.element,
  };

  static defaultProps = {
    children: null,
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
        observer.next(update);
      });
      return () => {
        this.socket.close();
      };
    });

    return observable.pipe(
      bufferTime(500),
      filter(donations => donations && donations.length),
    );
  }

  render() {
    const { children } = this.props;
    return children;
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
