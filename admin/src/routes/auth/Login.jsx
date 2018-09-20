import { Component } from 'react';
import AuthService from '../../services/AuthService';

class Login extends Component {
  authService = new AuthService();

  componentDidMount() {
    this.authService.login();
  }

  render() {
    return null;
  }
}

export default Login;
