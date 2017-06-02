import React from 'react';

// Changed class-based default component to named functional components

export function Message(props) {
  const {username, content} = props;
  return (
    <div className="message">
      <span className="message-username">{ username }</span>
      <span className="message-content">{ content }</span>
    </div>
  );
}

export function Notification({content}) {
  return (
    <div className="notification">
      <span className="message-content notification">{ content }</span>
    </div>
  );
}



// import React, { Component } from 'react';

// class Message extends Component {

//   // Handles incoming messags and notifications
//   get messageClass() {
//     switch(this.props.type) {
//       case "incomingMessage": return "message";
//       case "incomingNotification": return "notification";
//     }
//   }

//   render() {
//     return (
//       <div className={ this.messageClass }>
//         <span className="message-username">{ this.props.username }</span>
//         <span className="message-content">{ this.props.content }</span>
//       </div>
//     );
//   }
// }
// export default Message;


// function messageClass(type) {
//   switch(type) {
//     case "incomingMessage": return "message";
//     case "incomingNotification": return "notification";
//   }
// }

