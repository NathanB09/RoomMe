import React from 'react';
import { withFirebase } from '../firebase';
import '../css/Nav.css'

const LogoutBtn = ({ firebase }) => (
  <button className="nav_btn" onClick={firebase.handleSignOut}>
    Logout
  </button>
)

export default withFirebase(LogoutBtn);