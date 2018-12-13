import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { displayName: "guest" }
    };
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  signInWithPopup() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
    document.getElementsByClassName("button-sign-out")[0].style.display = "none";
    document.getElementsByClassName("button-sign-out")[0].style.display = "block";
  }

  signOut() {
    this.props.firebase.auth().signOut();
    document.getElementsByClassName("button-sign-out")[0].style.display = "block";
    document.getElementsByClassName("button-sign-out")[0].style.display = "none";
  }

  render(props) {
    return (
      <div className="component-user">
        <button className="button-sign-in" onClick={this.signInWithPopup.bind(this)}>Sign In</button>
        <button className="button-sign-out" onClick={this.signOut.bind(this)}>Sign Out</button>
        <div className="display-name-intro" >Currently signed in as:</div>
        <div className="display-name" >{this.props.user.displayName}</div>
        {/* {console.log(this.props)} */}
      </div>
    );
  }
}

export default User;
