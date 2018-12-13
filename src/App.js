import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import RoomList from "./components/RoomList.js";
import MessageList from "./components/MessageList.js";
import User from "./components/User.js";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDNwWqRfNGrFVV3EOPVFRwJPy1ifXFWVF8",
  authDomain: "bloc-chat-b8218.firebaseapp.com",
  databaseURL: "https://bloc-chat-b8218.firebaseio.com",
  projectId: "bloc-chat-b8218",
  storageBucket: "bloc-chat-b8218.appspot.com",
  messagingSenderId: "138110289954"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "Select a Room",
      user: { displayName: "guest" }
    };
  }

  handleRoomSet(newRoom) {
    this.setState({ activeRoom: newRoom });
  }

  setUser(user) {
    if (user) {
      this.setState({ user });
    } else {
      this.setState({ user: { displayName: "guest" } });
    }

    //console.log(this.state.user.displayName)
  }

  render() {
    return (
      <div className="App">

        <h1>Bloc Chat</h1>

        <RoomList
          firebase={firebase}
          triggerAppRoomSet={this.handleRoomSet.bind(this)}
        />
        <User
          firebase={firebase}
          user={this.state.user}
          setUser={this.setUser.bind(this)}
        />

        <MessageList
          firebase={firebase}
          triggerAppRoomMessages={this.state.activeRoom}
          user={this.state.user}
        />
      </div>
    );
  }
}

export default App;
