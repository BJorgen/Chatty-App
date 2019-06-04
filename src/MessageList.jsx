import React, {Component} from 'react';
import Message from './Message.jsx';


function MessageList(props){

  const messages = props.messages;
  const messageList = messages.map((message) =>
    <Message
      key={message.id}
      username={message.username}
      content={message.content}
    />
  );

  return (
    <main className="messages">
      {messageList}
    </main>
  );

}
export default MessageList;
