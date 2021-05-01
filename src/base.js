import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCj1JLw3V4IFl0WumX9HKT1yG6iBh_mCB4",
  authDomain: "nicole-catch-of-the-day.firebaseapp.com",
  databaseURL: "https://nicole-catch-of-the-day-default-rtdb.firebaseio.com",
  // measurementId: "G-VYXTX1X678"
});

// Rebase bindings
const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp };

// Default export
export default base;