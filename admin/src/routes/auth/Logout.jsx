import { Component } from 'react';
import AuthService from '../../services/AuthService';

class Logout extends Component {
  authService = new AuthService();

  componentDidMount() {
    this.authService.logout();
  }

  render() {
    return null;
  }
}

export default Logout;
