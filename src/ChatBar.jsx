import React, {Component} from 'react';

function ChatBar(props) {
  return (
    <footer className="chatbar">
      <input className="chatbar-username" name="username" placeholder="Your Name (Optional)" defaultValue={props.currentUser.name} onKeyPress={props.updateUserName}/>
      <input className="chatbar-message" name="content" placeholder="Type a message and hit ENTER" onKeyPress={props.addMessage}/>
    </footer>
  );
}
export default ChatBar;      
