import React, {Component} from 'react';
import Message from './Message.jsx';


function MessageList(props){

  const messages = props.messages;
  const messageList = messages.map((message) =>
    <Message
      key={message.id}
      type={message.type}
      username={message.username}
      content={message.content}
      colour={message.colour}
    />
  );

  return (
    <main className="messages">
      {messageList}
    </main>
  );

}
export default MessageList;
