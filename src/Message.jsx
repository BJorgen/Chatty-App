import React, {Component} from 'react';

function Message(props) {
  const style = { color: props.colour };

  if (props.type === "incomingMessage" || props.type === "postMessage") {
    return (
      <div className="message">
        <span className="message-username" style={style}>{props.username}</span>
        <span className="message-content">{props.content}</span>
      </div>
    );
  }
  else {
    return (
      <div className="notification">
        <span className="notification-content" style={style}>{props.content}</span>
      </div>
    );
  }

}
export default Message;