/* globals SL_ACCESS_TOKEN:false */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/bufferTime';
import 'rxjs/add/operator/filter';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import { fetchEventsFulfilled, streamEventsFulfilled, updateEvents } from 'actions';

import { EventList, EventNotification } from 'components';

class EventStream extends Component {
  static propTypes = {
    addNewEvents: PropTypes.func.isRequired,
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
    newCount: PropTypes.number.isRequired,
    refresh: PropTypes.func.isRequired,
  };

  socket = null;

  stream = null;

  async componentDidMount() {
    const { addNewEvents } = this.props;
    const observable = await this.createStream();
    this.stream = observable.subscribe(events => addNewEvents(events));
  }

  componentWillUnmount() {
    this.stream.unsubscribe();
  }

  async getToken() {
    const res = await fetch(
      `https://streamlabs.com/api/v1.0/socket/token?access_token=${SL_ACCESS_TOKEN}`,
    );

    if (!res.ok) {
      return '';
    }

    const data = await res.json();
    return data.socket_token;
  }

  async createStream() {
    const token = await this.getToken();

    this.socket = io(`https://sockets.streamlabs.com?token=${token}`, {
      transports: ['websocket'],
    });

    const observable = new Observable(observer => {
      this.socket.on('event', eventData => {
        observer.next(eventData);
      });

      return () => {
        this.socket.close();
      };
    });

    return observable
      .filter(event => {
        switch (event.type) {
          case 'bits':
          case 'follow':
          case 'host':
          case 'raid':
          case 'subscription':
            return true;

          default:
            return false;
        }
      })
      .bufferTime(500)
      .filter(events => events && events.length);
  }

  render() {
    const { events, newCount, refresh } = this.props;
    return (
      <div>
        <EventNotification newCount={newCount} refresh={() => refresh()} />
        <EventList events={events} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.items || [],
  newCount: state.events.newItems.length,
  newEvents: state.events.newItems,
});

const mapDispatchToProps = dispatch => ({
  addEvents: events => dispatch(fetchEventsFulfilled(events)),
  addNewEvents: events => dispatch(streamEventsFulfilled(events)),
  refresh: () => dispatch(updateEvents()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventStream);
