import firebase from 'firebase';
import 'firebase/firestore';

// Initialise firebase reference.
firebase.initializeApp({
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
});

// Initialise firestore reference.
var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
