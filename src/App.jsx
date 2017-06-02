import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {

  state = {
    username: '',
    messages: [],
    online: false
  }

  // Handles both old and new usernames and notification for change
  setNewUsername = (oldUsername, newUsername) => {
    this.setState({ username: newUsername });
    this.addNewNotification(`${oldUsername || 'Anonymous'} changed their name to ${newUsername}`);
  }

  send(payload) {
    this.socket.send(JSON.stringify(payload));
  }

  // Sends new message to the server as a string
  addNewMessage = (content) => {
    const message = {
      username: this.state.username,
      content: content,
      type: 'postMessage'
    };
    this.send(message);
  }

  // Sends new notification to the server as a string
  addNewNotification = (note) => {
    const notification = {
      type: 'postNotification',
      content: note
    }
    this.send(notification);
  }

  // Parses incoming messages/notifications/online users and handles them accordingly
  componentDidMount() {
    this.socket = new WebSocket(`ws://${location.hostname}:3001`);
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch(message.type) {
        case "incomingMessage":
        case "incomingNotification":
          this.setState({ messages: this.state.messages.concat(message)});
          break;
        case "onlineUsers":
          this.setState({ onlineUsers: message.onlineUsers });
          break;
        default:
          console.info('Unknown message type', message)
      }
    };

    this.socket.onopen = () => {
      console.log("Connected to server");
      this.setState({ online: true });
    }

    this.socket.onclose = () => {
      this.setState({ online: false });
    }
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <div className="messagecontainer">
        <NavBar online={this.state.online}
          onlineUsers={ this.state.onlineUsers }/>
        <MessageList messages={ this.state.messages }/>
        <ChatBar username={ this.state.username }
          newUsername={ this.setNewUsername }
          newMessage={ this.addNewMessage }
          online={this.state.online}
        />
      </div>
    );
  }
}
export default App;


