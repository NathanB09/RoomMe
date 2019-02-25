import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import '../css/App.css';
import Nav from './Nav';
import Landing from './Landing';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import { withAuthentication } from '../session';
import EditProfile from './EditProfile';
import API from '../constants/API';
import PropertyList from './PropertyList';
import Roomies from './Roomies';

const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Nav />

          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGNUP} component={SignUp} />
          <Route path={ROUTES.PROFILE} component={Profile} />
          <Route path={ROUTES.EDIT_PROFILE} component={EditProfile} />
          <Route path={ROUTES.PROPERTIES} component={PropertyList} />
          <Route path={ROUTES.ROOMIES} component={Roomies} />
        </div>
      </Router>
    </div>
  )
}

export default withAuthentication(App);
