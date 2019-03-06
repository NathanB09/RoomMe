import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './firebase';
import { BrowserRouter as Router } from 'react-router-dom';
require('dotenv').config()

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <App />
    </Router>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
