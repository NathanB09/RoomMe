import React, { Component } from 'react';
import { withAuthorization } from '../session';
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import '../css/Profile.css'

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
      <div className='profile_wrapper'>
        <div className='profile_banner_wrapper'>
          <Link to={ROUTES.EDIT_PROFILE}>
            <button><i className="fas fa-pencil-alt"></i> Edit</button>
          </Link>
        </div>
        <div className="profile_content_area">
          <div className="profile_img_wrapper">
            <img className='profile_img' src={profile_img} alt="" />
          </div>
          <div className="profile_content_description">
            <div className='preference_card_wrapper'>
              <p className='preference_card'>Budget: £{budgetMin} - £{budgetMax}</p>
              <p className='preference_card'>Drinks: {drink}</p>
            </div>
            <div>
              <h2>{username}</h2>
            </div>
            <div className='preference_card_wrapper'>
              <p className='preference_card'>Drugs: {drugs}</p>
              <p className='preference_card'>Smokes: {smoke}</p>
            </div>
          </div>
          <div>
            Saved Properties
          </div>
        </div>
      </div >
    );
  }
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(Profile);