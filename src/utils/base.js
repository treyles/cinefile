import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAfNDjPXJGv56fbMcsHnrGb1Vns4A3PFwI',
  authDomain: 'cinefile-app.firebaseapp.com',
  databaseURL: 'https://cinefile-app.firebaseio.com',
  projectId: 'cinefile-app',
  storageBucket: 'cinefile-app.appspot.com',
  messagingSenderId: '342757339995'
});

const base = Rebase.createClass(app.database());

export default base;
