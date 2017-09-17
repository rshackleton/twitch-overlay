/* globals API_PROTOCOL, API_HOST */
import { messaging } from './firebase';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(initialiseFirebaseMessaging);
}

/** Handle retrieving permission and token for push messaging. */
function initialiseFirebaseMessaging(registration) {
  messaging.useServiceWorker(registration);

  messaging.onTokenRefresh(getToken);

  return messaging.requestPermission()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('FCM: Permission granted.');
      return getToken();
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('FCM: Permission denied.', err);
    });

  function getToken() {
    return messaging.getToken()
      .then((refreshedToken) => {
        // eslint-disable-next-line no-console
        console.log('FCM: Token receieved.', refreshedToken);
        return setToken(refreshedToken);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('FCM: Token not receieved.', err);
      });
  }

  function setToken(token) {
    const url = `${API_PROTOCOL}://${API_HOST}/messaging/token`;
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    };

    return fetch(url, config)
      .then((res) => {
        if (!res.ok) {
          // eslint-disable-next-line no-console
          console.log('FCM: Token not stored.', res);
          return;
        }
        // eslint-disable-next-line no-console
        console.log('FCM: Token stored.', res);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('FCM: Token not stored.', err);
      });
  }
}
