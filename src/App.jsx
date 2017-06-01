import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Alex"},
      messages: []
    };

    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(username, content) {
    const message = {
      username: username,
      content: content
    };
    this.socket.send(JSON.stringify(message));

  }



  componentDidMount() {
    this.socket = new WebSocket("ws://127.0.0.1:3001");

    this.socket.onmessage = (event) => {
      // console.log("Received message:", message);
      let message = JSON.parse(event.data);
      // console.log('receivedMessage:', receivedMessage);

      const newMessages = this.state.messages.concat(message);
    // console.log(newMessages);
      this.setState({messages: newMessages});



      // here is where it receives message from server
      // need to make it show on page
    };

    this.socket.onopen = () => {
      console.log("Connected to server");
      // this is where the client sends message to server
      // this.socket.send('This message was sent to the server')
    }
  }


  render() {
    return (
      <div className="messagecontainer">
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={ this.state.messages }/>
        <ChatBar user={ this.state.currentUser.name } newMessage={ this.addNewMessage } />
      </div>
    );
  }
}
export default App;
