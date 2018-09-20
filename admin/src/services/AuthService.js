import auth0 from 'auth0-js';

export default class AuthService {
  auth0 = new auth0.WebAuth({
    domain: 'rs-test.eu.auth0.com',
    clientID: 'BYy3sG9EmUelV7Jbx8c46lXe79aaJXsp',
    redirectUri: 'http://localhost:5000/oauth/callback',
    responseType: 'token id_token',
    scope: 'openid profile',
  });

  /** The current user profile. */
  userProfile = null;

  /** Get the current access token. */
  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      throw new Error('No Access Token found');
    }

    return accessToken;
  }

  /** Get the current user profile. */
  getProfile() {
    return new Promise((resolve, reject) => {
      if (this.userProfile) {
        resolve(this.userProfile);
        return;
      }

      const accessToken = this.getAccessToken();

      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (err) {
          reject(err);
          return;
        }

        this.userProfile = profile;

        resolve(profile);
      });
    });
  }

  /** Handle the authentication callback. */
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          reject(err);
          return;
        }

        if (!authResult || !authResult.accessToken || !authResult.idToken) {
          reject(new Error('Auth data not set.'));
          return;
        }

        setSession(authResult);
        resolve(authResult);
      });
    });
  }

  /** Check if the session is authenticated. */
  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  /** Redirect to the login page. */
  login() {
    this.auth0.authorize();
  }

  /** Clear the authentication details. */
  logout() {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
    } catch (err) {
      console.error(err);
    }
  }
}

/** Update the authentication data in localstorage. */
function setSession(authResult) {
  try {
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  } catch (err) {
    console.error(err);
  }
}
