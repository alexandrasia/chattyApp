import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: this.props.user,
      message: ''
    }

  this.onNameChange = this.onNameChange.bind(this);
  this.onContentChange = this.onContentChange.bind(this);
  this.onKeyDown = this.onKeyDown.bind(this);
  }



  onNameChange(event) {
    console.log(event.target.value);
    this.setState({ username: event.target.value });
  }

  onContentChange(event) {
    console.log(event.target.value);
    this.setState({ message: event.target.value });
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
      this.props.newMessage(this.state.username, this.state.message);
      console.log(this.state.content);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
        placeholder="Your Name (Optional)"
        value={ this.state.username }
        onChange={ this.onNameChange }/>
        <input className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        onChange={ this.onContentChange }
        onKeyDown={ this.onKeyDown }/>
    </footer>
    );
  }
}
export default ChatBar;





