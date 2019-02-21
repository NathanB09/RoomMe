import React from 'react';
import { withFirebase } from '../firebase';

const SignOutBtn = ({ firebase }) => (
  <button onClick={firebase.handleSignOut}>
    Sign Out
  </button>
)

export default withFirebase(SignOutBtn);