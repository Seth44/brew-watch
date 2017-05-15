import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

import App from './App';
import './index.css';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCSXGQ9twcfkfeoZ-Xk_qgTdjBcCuBIiYw",
  authDomain: "brew-watch.firebaseapp.com",
  databaseURL: "https://brew-watch.firebaseio.com",
  projectId: "brew-watch",
  storageBucket: "brew-watch.appspot.com",
  messagingSenderId: "147343129152"
};

firebase.initializeApp(config);

injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
