import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: ''
    }

  this.onNameChange = this.onNameChange.bind(this);
  this.onContentChange = this.onContentChange.bind(this);
  this.onKeyDown = this.onKeyDown.bind(this);
  // this.onUsernameKeyDown = this.onUsernameKeyDown.bind(this);
  // this.onBlur = this.onBlur.bind(this);
  }



  onNameChange(event) {
    // console.log(event.target.value);
    this.setState({ username: event.target.value });
  }

  onContentChange(event) {
    console.log(event.target.value);
    this.setState({ message: event.target.value });
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
      this.props.newMessage(this.state.message);
      this.setState({ message: ''});
      // console.log(this.state.content);
    }
  }

  onUsernameChanged = (event) => {
    if(event.type === 'blur' || (event.key && event.key === 'Enter'))
    {
      if(this.props.username !== this.state.username) {
        this.props.newUsername(this.props.username, this.state.username);
      }
    }
  }

  // onUsernameKeyDown(event) {
  //   if (event.key === 'Enter') {
  //     this.props.newUsername(this.props.username, this.state.username);
  //   }
  // }

  // onBlur(event) {
  //   console.log(event.type);
  //   this.props.newUsername(this.props.username, this.state.username);
  //   // this.props.newNotification();
  // }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
        placeholder="Your Name (Optional)"
        value={ this.state.username }
        onChange={ this.onNameChange }
        onBlur={ this.onUsernameChanged }
        onKeyDown={ this.onUsernameChanged }/>

        <input className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        value={ this.state.message }
        onChange={ this.onContentChange }
        onKeyDown={ this.onKeyDown }/>
    </footer>
    );
  }
}
export default ChatBar;





