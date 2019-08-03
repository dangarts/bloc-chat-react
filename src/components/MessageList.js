import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: "",
      placeholderMsg: "Type Message _"
    };
    this.messagesRef = this.props.firebase.database().ref("messages");
    // this.sessionRef = this.props.firebase.database().ref("session");
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

  /* NEW MESSAGES *********  */
  newMessageChanged(event) {
    this.setState({
      newMessage: event.target.value
    });
  }

  formatDate(timeStamp) {
    let newDate = new Date(timeStamp);

    let tsHour = newDate.getHours();
    let tsMin = newDate.getMinutes();
    let ampm = tsHour >= 12 ? "pm" : "am";

    tsHour = tsHour % 12;
    tsHour = tsHour ? tsHour : 12;
    tsMin = tsMin < 10 ? "0" + tsMin : tsMin;

    let formattedDate = tsHour + ":" + tsMin + " " + ampm;

    return formattedDate;
  }

  createMessage(event) {
    event.preventDefault();

    this.messagesRef.push({
      username: this.props.user.displayName,
      content: this.state.newMessage,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.triggerAppRoomMessages
    });
    let scrolltoElement = document.getElementById("messagelist-scrollto");
    scrolltoElement.scrollIntoView();

    document.getElementById("messagelist-input-form").reset();
  }

  // gotoBottom() {
  //   document.getElementsByClassName('messagelist-content-scroll').scrollIntoView({behavior: "instant", block: "end", inline: "nearest"});
  //   }

  onFocusCreateMessage() {
    this.setState({ placeholderMsg: "" });
  }

  onBlurCreateMessage() {
    this.setState({ placeholderMsg: "Type message _" });
  }

  render() {
    return (
      <div className="component-messagelist">
        <div className="messagelist-wrapper">
          <div className="messagelist-content-scroll">
            <h2>{this.setMessages()}</h2>

            {this.state.messages
              .filter(message => message.roomId === this.setMessages())
              .map((message, index) => (
                <div className="message-wrapper" key={index}>
                  <div className="message-username">{message.username} </div>
                  <div className="message-content">
                    <span>{message.content}</span>
                  </div>
                  <div className="message-sentAt">
                    {this.formatDate(message.sentAt)}
                  </div>
                </div>
              ))}

            <div id="messagelist-scrollto" />
          </div>
        </div>

        <div className="messagelist-input">
          <form
            onSubmit={event => this.createMessage(event)}
            id="messagelist-input-form"
          >
            {/* <label htmlFor="messageInput" /> */}
            <input
              onChange={event => this.newMessageChanged(event)}
              id="messageInput"
              name="messageInput"
              placeholder={this.state.placeholderMsg}
              onFocus={this.onFocusCreateMessage.bind(this)}
              onBlur={this.onBlurCreateMessage.bind(this)}
              autoComplete="off"
            />

            <button type="submit">
              <span className="icon ion-md-return-left" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MessageList;
