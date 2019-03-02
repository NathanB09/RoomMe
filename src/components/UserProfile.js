import React, { Component } from 'react';
import { withAuthorization } from '../session';
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import '../css/Profile.css'
import Property from './Property';

class UserProfile extends Component {

  state = {
    username: '',
    budgetMin: '',
    budgetMax: '',
    drink: '',
    drugs: '',
    smoke: '',
    profile_img: '',
    savedProperties: {}
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
        profile_img: snapshot.val().profile_img,
        savedProperties: snapshot.val().savedProperties
      }))
  }


  render() {
    const { username,
      budgetMin,
      budgetMax,
      drink,
      drugs,
      smoke,
      profile_img,
      savedProperties } = this.state
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
              <div className='preference_card'>
                <i className="fas fa-coins"></i>
                <p>£{budgetMin} - £{budgetMax}</p>
              </div>
              <div className='preference_card'>
                <i className="fas fa-cocktail"></i>
                Drinks: {drink}
              </div>
            </div>
            <div>
              <h2>{username}</h2>
            </div>
            <div className='preference_card_wrapper'>
              <div className='preference_card'>
                <i className="fas fa-pills"></i>
                Drugs: {drugs}
              </div>
              <div className='preference_card'>
                <i className="fas fa-smoking"></i>
                Smokes: {smoke}
              </div>
            </div>
          </div>
          <h3 className='properties_wrapper'>Saved Properties</h3>
          <div className='properties_wrapper'>
            {savedProperties && Object.values(savedProperties).map(listing => <Property key={listing.lister_url} listing={listing} firebase={this.props.firebase} saveDelete={"Delete"} />)}
          </div>
        </div>
      </div >
    );
  }
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(UserProfile);