import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes'
import LogoutBtn from './LogoutBtn';
import { AuthUserContext } from '../session';
import '../css/Nav.css'

const Nav = () => (
  <AuthUserContext.Consumer>
    {authUser => authUser ? <NavAuthorized /> : <NavUnauthorized />}
  </AuthUserContext.Consumer>
)

const NavUnauthorized = () => (
  <ul>
    <li className="logo">
      <Link to={ROUTES.LANDING}>
        <img src={require("../images/nav_logo.svg")} alt="nav logo" />
      </Link>
    </li>
    <li><Link className="nav_link" to={ROUTES.LOGIN}>Login</Link></li>
    <li>
      <Link className="nav_link" to={ROUTES.SIGNUP}>
        <button className="nav_btn">Sign Up</button>
      </Link>
    </li>
  </ul>
)

const NavAuthorized = () => (
  <ul>
    <li className="logo">
      <Link to={ROUTES.LANDING}>
        <img src={require("../images/nav_logo.svg")} alt="nav logo" />
      </Link>
    </li>
    <li><Link className="nav_link" to={ROUTES.PROPERTIES}>Properties</Link></li>
    <li><Link className="nav_link" to={ROUTES.ROOMIES}>Roomies</Link></li>
    <li><Link className="nav_link" to={ROUTES.USER_PROFILE}>Profile</Link></li>
    <li><LogoutBtn /></li>
  </ul>
)

export default Nav;