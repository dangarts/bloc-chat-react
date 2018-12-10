import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/database";

import RoomList from "./components/RoomList.js";
import MessageList from "./components/MessageList.js";

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
       activeRoom: 'Welcome'
    };
 }

   handleRoomSet(newRoom) {
      this.setState({ activeRoom: newRoom });
      //console.log(this.state.activeRoom);
  }


  render() {
    return (
      <div className="App">
        <RoomList firebase = {firebase} triggerAppRoomSet = {this.handleRoomSet.bind(this)}/>
        <MessageList firebase = {firebase} triggerAppRoomMessages = {this.state.activeRoom}/>
      </div>
    );
  }
}

export default App;
