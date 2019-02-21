import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import '../css/App.css';
import Nav from './Nav';
import Landing from './Landing';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Account from './Account';

const App = () => (
  <div className="App">
    <Router>
      <div>
        <Nav />

        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.SIGNUP} component={SignUp} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
      </div>
    </Router>
  </div>
)

export default App;
