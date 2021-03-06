import React, { Component } from 'react';
import { withAuthorization } from '../session';
import '../css/Profile.css'
import Property from './Property';
import MessageBox from './MessageBox';

class RoomieProfile extends Component {

  state = {
    username: '',
    id: '',
    budgetMin: '',
    budgetMax: '',
    drink: '',
    profession: '',
    smoke: '',
    profile_img: '',
    savedProperties: {},
    showMessages: false
  }

  componentDidMount() {
    this.props.firebase.users()
      .on('value', snapshot => {
        Object.values(snapshot.val()).forEach(roomie => {
          if (roomie.username === this.props.match.params.username) {
            this.setState({
              username: roomie.username,
              id: roomie.id,
              budgetMin: roomie.budgetMin,
              budgetMax: roomie.budgetMax,
              drink: roomie.drink,
              profession: roomie.profession,
              smoke: roomie.smoke,
              profile_img: roomie.profile_img,
              savedProperties: roomie.savedProperties
            })
          }
        })
      })
  }

  componentWillUnmount() {
    this.props.firebase.users().off()
  }

  toggleMessageBox = () => {
    this.setState({ showMessages: !this.state.showMessages })
  }

  render() {
    const { username,
      id,
      budgetMin,
      budgetMax,
      drink,
      profession,
      smoke,
      profile_img,
      savedProperties,
      showMessages } = this.state
    return (
      <div className='profile_wrapper'>
        <div className="save_notification_wrapper">
          <div className="notification_card">
            <p><i className="fas fa-home"></i> Property Saved!</p>
          </div>
        </div>
        <div className='profile_banner_wrapper'>
          <button onClick={this.toggleMessageBox}>Message</button>
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
                <p>{drink}</p>
              </div>
            </div>
            <div>
              <h2>{username}</h2>
            </div>
            <div className='preference_card_wrapper'>
              <div className='preference_card'>
                <i className="fas fa-users"></i>
                <p>{profession}</p>
              </div>
              <div className='preference_card'>
                <i className="fas fa-smoking"></i>
                <p>{smoke}</p>
              </div>
            </div>
          </div>
          <h3>Saved Properties</h3>
          <div className='properties_wrapper'>
            {savedProperties && Object.values(savedProperties).map(listing => <Property key={listing.lister_url} listing={listing} firebase={this.props.firebase} saveDelete={"Save"} />)}
          </div>
          <MessageBox
            roomieID={id}
            roomieUsername={username}
            showMessages={showMessages}
            toggleMessageBox={this.toggleMessageBox} />
        </div>
      </div >
    );
  }
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(RoomieProfile);