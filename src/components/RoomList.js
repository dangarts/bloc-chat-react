import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newChatRoom: ""
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
  }

  onHandleRoomSet(newRoom) {
    this.props.triggerAppRoomSet(newRoom.name);
  }

  render(props) {
    return (
      <div className="list-room-info">
        <h1>Available Chat Rooms:</h1>
        {this.state.rooms.map((room, index) => (
          <button onClick={e => this.onHandleRoomSet(room, e)} key={index}>
            {room.name}
          </button>
        ))}

        <form
          onSubmit={event => this.createRoom(event)}
          id="new-chat-room-form"
        >
          <label htmlFor="newChatRoom">Enter new name: </label>
          <input
            onChange={event => this.newChatNameChanged(event)}
            id="newChatRoom"
            name="newChatRoom"
          />
          <button type="submit">Create New Chat</button>
        </form>
      </div>
    );
  }
}

export default RoomList;
