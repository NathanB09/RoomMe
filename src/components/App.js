import React from 'react';
import { Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import '../css/App.css';
import Nav from './Nav';
import Landing from './Landing';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import UserProfile from './UserProfile';
import { withAuthentication } from '../session';
import PropertyList from './PropertyList';
import RoomieList from './RoomieList';
import RoomieProfile from './RoomieProfile';
import EditProfile from './EditProfile'

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.HOME} component={Home} />
      <Route path={ROUTES.LOGIN} component={Login} />
      <Route path={ROUTES.SIGNUP} component={SignUp} />
      <Route exact path={ROUTES.USER_PROFILE} component={UserProfile} />
      <Route path={ROUTES.EDIT_PROFILE} component={EditProfile} />
      <Route path={ROUTES.PROPERTIES} component={PropertyList} />
      <Route exact path={ROUTES.ROOMIES} component={RoomieList} />
      <Route path={ROUTES.ROOMIE_PROFILE} component={RoomieProfile} />
    </div>
  )
}

export default withAuthentication(App);
