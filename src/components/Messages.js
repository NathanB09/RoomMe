import React from 'react';

class Messages extends React.Component {

  messageRef = null

  setReference = element => this.messageRef = element

  scrollToBottom = () => { if (this.messageRef) { this.messageRef.scrollIntoView() } }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    const { messages, roomieID } = this.props
    return (
      <div className="messages">
        {Object.values(messages).map(message =>
          roomieID === message.receiverId
            ? <p key={message.timestamp} className="msg_receiver">{message.messageText}</p>
            : <p key={message.timestamp} className="msg_sender">{message.messageText}</p>
        )}
        <div ref={this.setReference}></div>
      </div>
    );
  }
};

export default Messages;