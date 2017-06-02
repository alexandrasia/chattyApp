import React, { Component } from "react";

import { Message, Notification } from "./Message.jsx";

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      return (
        message.type === 'incomingMessage' ?
          <Message
            key={message.id}
            username={message.username}
            content={message.content}
          /> :
          <Notification
            key={message.id}
            content={message.content}
          />
      );
    });

    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}
export default MessageList;



// Compact way of expressing the above
// Using destructuring from arguments, rest arguments, and spread

// export default function MessageList({messages}) {
//   return (
//     <main className="messages">
//     {
//       messages.map(({type, id: key, ...rest}) => {
//         switch(type) {
//           case 'incomingMessage':
//             return <Message key={key} {...rest} />
//           case 'incomingNotification':
//             return <Motification key={key} {...rest} />
//         }
//       })
//     }
//     </main>
//   );
// }
