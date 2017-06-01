import React, { Component } from "react";

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      message: ""
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  // Sets username
  onNameChange(event) {
    this.setState({ username: event.target.value });
  }

  // Sets message
  onContentChange(event) {
    this.setState({ message: event.target.value });
  }

  // New message on enter and clears textboc
  onKeyDown(event) {
    if (event.key === "Enter") {
      this.props.newMessage(this.state.message);
      this.setState({ message: "" });
    }
  }

  // When blur or enter pressed, handles the old and new usernames
  onUsernameChanged = event => {
    if (event.type === "blur" || (event.key && event.key === "Enter")) {
      if (this.props.username !== this.state.username) {
        this.props.newUsername(this.props.username, this.state.username);
      }
    }
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.username}
          onChange={this.onNameChange}
          onBlur={this.onUsernameChanged}
          onKeyDown={this.onUsernameChanged}
        />

        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.message}
          onChange={this.onContentChange}
          onKeyDown={this.onKeyDown}
        />
      </footer>
    );
  }
}
export default ChatBar;
