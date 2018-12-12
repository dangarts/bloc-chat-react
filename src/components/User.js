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
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render(props) {
    return (
      <div className="component-user">
        <button onClick={this.signInWithPopup.bind(this)}>Sign In</button>
        <button onClick={this.signOut.bind(this)}>Sign Out</button>
        <div>{this.props.user.displayName}</div>
        {/* {console.log(this.props)} */}
      </div>
    );
  }
}

export default User;
