import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/database";

import RoomList from "./components/RoomList.js";

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
  render() {
    return (
      <div className="App">
        <RoomList firebase = {firebase} />
      </div>
    );
  }
}

export default App;
