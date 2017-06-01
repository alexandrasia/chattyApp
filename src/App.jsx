import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      messages: []
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.setNewUsername = this.setNewUsername.bind(this);
  }

  // Handles both old and new usernames and notification for change
  setNewUsername(oldUsername, newUsername) {
    this.setState({ username: newUsername });
    this.addNewNotification(`${oldUsername || 'Anonymous'} changed their name to ${newUsername}`);
  }

  // Sends new message to the server as a string
  addNewMessage(content) {
    const message = {
      username: this.state.username,
      content: content,
      type: 'postMessage'
    };
    this.socket.send(JSON.stringify(message));
  }

  // Sends new notification to the server as a string
  addNewNotification(note) {
    const notification = {
      type: 'postNotification',
      content: note
    }
    this.socket.send(JSON.stringify(notification));
  }

  // Parses incoming messages/notifications/online users and handles them accordingly
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = (event) => {
      let message = JSON.parse(event.data);
      switch(message.type) {
        case "incomingMessage":
        case "incomingNotification": this.setState({ messages: this.state.messages.concat(message)});
        break;
        case "onlineUsers": this.setState({ onlineUsers: message.onlineUsers });
        break;
      }
    };
    this.socket.onopen = () => {
      console.log("Connected to server");
    }
  }

  render() {
    return (
      <div className="messagecontainer">
        <NavBar onlineUsers={ this.state.onlineUsers }/>
        <MessageList messages={ this.state.messages }/>
        <ChatBar username={ this.state.username }
          newUsername={ this.setNewUsername }
          newMessage={ this.addNewMessage }
        />
      </div>
    );
  }
}
export default App;


