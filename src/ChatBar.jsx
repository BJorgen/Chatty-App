import React, {Component} from 'react';

function ChatBar(props) {
  const onSubmit = event => {
    event.preventDefault();
    const username = event.target.elements.username;
    const content = event.target.elements.content;
    props.addMessage(username.value, content.value);
    content.value = "";
    
  }
  return (
    <footer className="chatbar">
    <form onSubmit={onSubmit}>
      <input className="chatbar-username" name="username" placeholder="Your Name (Optional)" defaultValue={props.currentUser.name}/>
      <input className="chatbar-message" name="content" placeholder="Type a message and hit ENTER"/>
      <input type="submit"/>
    </form>
    </footer>
  );
}
export default ChatBar;      
