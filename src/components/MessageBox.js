import React, { Component } from 'react';
import { withAuthorization } from '../session';
import Messages from './Messages';
import '../css/MessageBox.css'

class MessageBox extends Component {

  state = {
    newMessage: '',
    messages: {}
  }

  componentDidUpdate(prevProps) {
    if (this.props.roomieID !== prevProps.roomieID) {
      const { firebase, roomieID } = this.props
      const userID = this.props.firebase.auth.currentUser.uid
      firebase.chat(this.chatID(userID, roomieID))
        .on('value', snapshot => {
          if (snapshot.val()) {
            const allMessages = Object.values(snapshot.val())
              .sort((a, b) => a.timestamp < b.timestamp ? -1 : 1)
            this.setState({ messages: allMessages })
          }
        })
    }
  }

  componentWillUnmount() {
    const { firebase, roomieID } = this.props
    const user = this.props.firebase.auth.currentUser
    user && firebase.chat(this.chatID(user.uid, roomieID)).off()
  }


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.newMessage && this.state.newMessage.replace(/\s+/g, '') !== '') {
      const { firebase, roomieID } = this.props
      const userID = this.props.firebase.auth.currentUser.uid
      const messageID = Math.random().toString(36).substr(2, 16)
      firebase.chat(this.chatID(userID, roomieID))
        .update({
          [messageID]: {
            messageText: this.state.newMessage,
            receiverId: roomieID,
            senderId: userID,
            timestamp: + new Date()
          }
        })
    }

    this.setState({ newMessage: '' })
  }

  chatID = (uid1, uid2) => {
    return uid1 < uid2 ? (uid1 + uid2) : (uid2 + uid1)
  }

  render() {
    const { roomieID, roomieUsername, toggleMessageBox, showMessages } = this.props
    return (
      <div className={"message_box_wrapper" + (showMessages ? " show" : "")}>
        <div onClick={toggleMessageBox} className="message_bar">{roomieUsername}</div>
        <Messages messages={this.state.messages} roomieID={roomieID} />
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            name="newMessage"
            type="text"
            placeholder="Message"
            value={this.state.newMessage} />
          <button type="submit"><i className="fas fa-location-arrow"></i></button>
        </form>
      </div>
    );
  }
}

const condition = authUser => !!authUser

export default withAuthorization(condition)(MessageBox);