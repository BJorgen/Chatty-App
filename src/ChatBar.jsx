import React, {Component} from 'react';

function ChatBar(props) {
  const onKeyPress = event => {
    if (event.charCode == 13) {
      event.preventDefault();
      const username = event.target.previousElementSibling;
      const content = event.target;
      props.addMessage(username.value, content.value);
      content.value = "";
    } 
  }
  return (
    <footer className="chatbar">
      <input className="chatbar-username" name="username" placeholder="Your Name (Optional)" defaultValue={props.currentUser.name}/>
      <input className="chatbar-message" name="content" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPress}/>
    </footer>
  );
}
export default ChatBar;      
