import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyC8BKkDgArVMB-nt_d6HyTsqf6itghnucw',
  authDomain: 'twitch-overlay-rs.firebaseapp.com',
  databaseURL: 'https://twitch-overlay-rs.firebaseio.com',
  projectId: 'twitch-overlay-rs',
  storageBucket: 'twitch-overlay-rs.appspot.com',
  messagingSenderId: '871762046895',
};

firebase.initializeApp(config);

// Named messaging export.
export const messaging = firebase.messaging();

// Default firebase export.
export default firebase;
