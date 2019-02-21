import React from 'react';
import { withFirebase } from '../firebase';

const LogoutBtn = ({ firebase }) => (
  <button onClick={firebase.handleSignOut}>
    Logout
  </button>
)

export default withFirebase(LogoutBtn);