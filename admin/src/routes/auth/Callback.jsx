import React, { Component } from 'react';
import AuthService from '../../services/AuthService';

class Logout extends Component {
  authService = new AuthService();

  state = {};

  componentDidMount() {
    this.authService
      .handleAuthentication()
      .then(() => this.authService.getProfile())
      .then(profile => this.setState({ profile }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { error, profile } = this.state;

    if (error) {
      return (
        <p>
          Error:
          <br />
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </p>
      );
    }

    if (profile) {
      return (
        <p>
          Success:
          <br />
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </p>
      );
    }

    return null;
  }
}

export default Logout;
