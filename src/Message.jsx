import React, {Component} from 'react';

function Message(props) {
  if (props.type === "incomingMessage" || props.type === "postMessage") {
    return (
      <div className="message">
        <span className="message-username">{props.username}</span>
        <span className="message-content">{props.content}</span>
      </div>
    );
  }
  else {
    return (
      <div className="notification">
        <span className="notification-content">{props.content}</span>
      </div>
    );
  }

}
export default Message;