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
            user.drugs === roomie.drugs ||
            user.smoke === roomie.smoke)
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
        {this.state.roomies.map(roomie => <Roomie key={roomie.email} roomie={roomie} />)}
      </div>
    );
  }
};

const condition = authUser => !!authUser

export default withAuthorization(condition)(RoomieList);