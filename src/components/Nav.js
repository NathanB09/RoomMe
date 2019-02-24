import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes'
import LogoutBtn from './LogoutBtn';
import { AuthUserContext } from '../session';

const Nav = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavAuthorized /> : <NavUnauthorized />}
    </AuthUserContext.Consumer>
  </div>
)

const NavUnauthorized = () => (
  <ul>
    <li><Link to={ROUTES.LANDING}>RoomMe</Link></li>
    <li><Link to={ROUTES.LOGIN}>Login</Link></li>
    <li><Link to={ROUTES.SIGNUP}>Sign Up</Link></li>
  </ul>
)

const NavAuthorized = () => (
  <ul>
    <li><Link to={ROUTES.LANDING}>RoomMe</Link></li>
    <li><Link to={ROUTES.HOME}>Home</Link></li>
    <li><Link to={ROUTES.PROFILE}>Profile</Link></li>
    <li><LogoutBtn /></li>
  </ul>
)

export default Nav;