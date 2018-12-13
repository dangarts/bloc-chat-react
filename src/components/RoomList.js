import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newChatRoom: "",
      placeholder: "Add room name"
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  newChatNameChanged(event) {
    this.setState({
      newChatRoom: event.target.value
    });
  }

  createRoom(event) {
    event.preventDefault();

    this.roomsRef.push({
      name: this.state.newChatRoom
    });

    //reset form
    document.getElementById("new-chat-room-form").reset();
    document.getElementById("utility-form-area").style.display = "block";
    document.getElementById("new-chat-room-form").style.display = "none";
    document.getElementById("add-room-button").style.display = "block";
  }

  onHandleRoomSet(newRoom) {
    this.props.triggerAppRoomSet(newRoom.name);
     document.getElementsByClassName("messagelist-input")[0].style.display="block";
  }

  onFocusCreateRoom() {
    this.setState({ placeholder: "" });
  }

  onBlurCreateRoom() {
    this.setState({ placeholder: "Add room name" });
  }

  handleDisplayRoomForm(e) {
    //console.log("test");
    
    document.getElementById("utility-form-area").style.display = "none";
    document.getElementById("new-chat-room-form").style.display = "block";
    document.getElementById("add-room-button").style.display = "none";
  }

  render(props) {
    return (
      <div className="component-roomlist">
        

        <div className="available-room-list">
          {this.state.rooms.map((room, index) => (
            <button onClick={e => this.onHandleRoomSet(room, e)} key={index}>
              {room.name}
            </button>
          ))}
        </div>

        <button
          id="add-room-button"
          className="add-room-button"
          onClick={this.handleDisplayRoomForm.bind(this)}
        >
          <span className="icon ion-md-add-circle" />
        </button>
        <div id="utility-form-area">Create a Room</div>

        <form
          onSubmit={event => this.createRoom(event)}
          id="new-chat-room-form"
        >
          <label htmlFor="newChatRoom" />
          <input
            onChange={event => this.newChatNameChanged(event)}
            id="newChatRoom"
            name="newChatRoom"
            placeholder={this.state.placeholder}
            onFocus={this.onFocusCreateRoom.bind(this)}
            onBlur={this.onBlurCreateRoom.bind(this)}
          />

          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}

export default RoomList;
