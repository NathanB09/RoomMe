import React from 'react';
import { withAuthorization } from '../session';
import Roomie from './Roomie';
import '../css/RoomieList.css'

class RoomieList extends React.Component {

  state = {
    roomies: []
  }

  componentDidMount() {
    const userId = this.props.firebase.auth.currentUser.uid
    this.props.firebase.users().on('value', snapshot => {
      const user = snapshot.val()[userId]
      Object.values(snapshot.val()).forEach(roomie => {
        if (user.email !== roomie.email &&
          (user.drink === roomie.drink ||
            user.smoke === roomie.smoke) &&
          (parseInt(user.budgetMax) >= parseInt(roomie.budgetMin) &&
            parseInt(user.budgetMin) <= parseInt(roomie.budgetMax))
        ) {
          this.setState({ roomies: [...this.state.roomies, roomie] })
        }
      })
    })
  }

  componentWillUnmount() {
    this.props.firebase.users().off()
  }

  render() {
    return (
      <div>
        <div className='roomie_banner_wrapper'>
          <img src={require('../images/roomme_logo.svg')} alt="roomie logo" />
        </div>
        <div className="roomie_page_heading">
          <h1>Roomies</h1>
        </div>
        <div className="roomie_wrapper">
          {this.state.roomies.map(roomie => <Roomie key={roomie.email} roomie={roomie} />)}
        </div>
      </div>
    );
  }
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(RoomieList);