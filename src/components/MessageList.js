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

    if (this.state.newMessage === "") {
      console.log("need a value");
    } else {
      this.messagesRef.push({
        username: this.props.user.displayName,
        content: this.state.newMessage,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.props.triggerAppRoomMessages
      });
      let scrolltoElement = document.getElementById("messagelist-scrollto");
      scrolltoElement.scrollIntoView();

      this.setState({ newMessage: "" });
      document.getElementById("messagelist-input-form").reset();
    }
  }

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

            {this.props.triggerAppRoomMessages === "Welcome!" && (
              <div className="home-content">
                <p>
                  This is a simple React based chat app using firebase. To the
                  left are existing rooms and an option to create a new room.
                </p>
                <p>
                  You are initially logged in as 'guest' and the chat dialogue
                  will reflect this. The 'sign-in' button will popup a new
                  page(tab) allowing you to authenticate via Google Sign-In,
                  thus rendering a personal display name.
                </p>
                <p>
                  Please{" "}
                  <a
                    href="http://dangarts.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Contact Tai Dang"
                  >
                    contact
                  </a>{" "}
                  me if you're experiencing any issues.
                </p>
              </div>
            )}

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

        {this.props.triggerAppRoomMessages !== "Welcome!" && (
          <div className="messagelist-input">
            <form
              onSubmit={event => this.createMessage(event)}
              id="messagelist-input-form"
            >
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
        )}
      </div>
    );
  }
}

export default MessageList;
