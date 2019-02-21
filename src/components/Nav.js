import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes'
import SignOutBtn from './SignOutBtn';

const Nav = () => (
  <div>
    <ul>
      <li><Link to={ROUTES.LANDING}>RoomMe</Link></li>
      <li><Link to={ROUTES.HOME}>Home</Link></li>
      <li><Link to={ROUTES.LOGIN}>Login</Link></li>
      <li><Link to={ROUTES.SIGNUP}>Sign Up</Link></li>
      <li><SignOutBtn /></li>
    </ul>
  </div>
)

export default Nav;