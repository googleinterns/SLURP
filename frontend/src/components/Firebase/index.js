/**
 * Initializes and exports a firebase application pointing to project
 * 'step53-2020'.
 */
import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAAJgRhJY_rRn_q_On1HdA3hx15YHSkEJg',
  authDomain: 'step53-2020.firebaseapp.com',
  databaseURL: 'https://step53-2020.firebaseio.com',
  projectId: 'step53-2020',
  storageBucket: 'step53-2020.appspot.com',
  messagingSenderId: '905834221913',
  appId: '1:905834221913:web:25e711f1132b2c0537fc48',
  measurementId: 'G-PLVY991DHW'
});

export default app;
