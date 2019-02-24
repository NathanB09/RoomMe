import React, { Component } from 'react';
import { withAuthorization } from '../session';
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

class Profile extends Component {

  state = {
    username: ''
  }

  componentDidMount() {
    const user = this.props.firebase.auth.currentUser
    this.props.firebase.user(user.uid)
      .on('value', snapshot => this.setState({ username: snapshot.val().username }))
  }

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <h2>{this.state.username}</h2>
        <Link to={ROUTES.EDIT_PROFILE}><button>Edit Profile</button></Link>
      </div >
    );
  }
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(Profile);