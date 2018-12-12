import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
      //console.log(snapshot);
    });
  }

  setMessages() {
    return this.props.triggerAppRoomMessages;
  }

  render() {
    return (
      <div className="component-messagelist">
        <div className="messagelist-wrapper">
          <h2>{this.setMessages()}</h2>

          {this.state.messages
            .filter(message => message.roomId === this.setMessages())
            .map((message, index) => (
              <div className="message" key={index}>
                <div>User: {message.username} </div>
                <div>Message: {message.content} </div>
                <div>Sent: {message.sentAt}</div>
                <br />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default MessageList;
