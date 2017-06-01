import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
// import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      messages: []
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    // this.addNewNotification = this.addNewNotification.bind(this);
    this.setNewUsername = this.setNewUsername.bind(this);
  }

  setNewUsername(oldUsername, newUsername) {
    this.setState({ username: newUsername });
    this.addNewNotification(`${oldUsername || 'Unknown'} changed their name to ${newUsername}`);
  }

  addNewMessage(content) {
    const message = {
      username: this.state.username,
      content: content,
      type: 'postMessage'
    };
    this.socket.send(JSON.stringify(message));
    // console.log(message);
  }

  addNewNotification(note) {
    const notification = {
      type: 'postNotification',
      content: note
    }

    this.socket.send(JSON.stringify(notification));
  }



  componentDidMount() {
    this.socket = new WebSocket("ws://127.0.0.1:3001");

    this.socket.onmessage = (event) => {

      let message = JSON.parse(event.data);

      const newMessages = this.state.messages.concat(message);
      this.setState({messages: newMessages});

    };

    this.socket.onopen = () => {
      console.log("Connected to server");

    }
  }


  render() {
    return (
      <div className="messagecontainer">
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        </nav>
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
