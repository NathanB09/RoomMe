import React, { Component } from 'react';
import { withAuthorization } from '../session';
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

class Profile extends Component {

  state = {
    username: '',
    budgetMin: '',
    budgetMax: '',
    drink: '',
    drugs: '',
    smoke: '',
    profile_img: ''
  }

  componentDidMount() {
    const user = this.props.firebase.auth.currentUser
    this.props.firebase.user(user.uid)
      .on('value', snapshot => this.setState({
        username: snapshot.val().username,
        budgetMin: snapshot.val().budgetMin,
        budgetMax: snapshot.val().budgetMax,
        drink: snapshot.val().drink,
        drugs: snapshot.val().drugs,
        smoke: snapshot.val().smoke,
        profile_img: snapshot.val().profile_img
      }))
  }


  render() {
    const { username,
      budgetMin,
      budgetMax,
      drink,
      drugs,
      smoke,
      profile_img } = this.state
    return (
      <div>
        <h1>Profile</h1>
        <img src={profile_img} alt="" />
        <h2>{username}</h2>
        <p>Budget: £{budgetMin} - £{budgetMax}</p>
        <p>Drinks: {drink}</p>
        <p>Drugs: {drugs}</p>
        <p>Smokes: {smoke}</p>
        <Link to={ROUTES.EDIT_PROFILE}><button>Edit Profile</button></Link>
      </div >
    );
  }
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(Profile);