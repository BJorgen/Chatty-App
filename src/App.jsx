import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const data = {
  currentUser: {name: 'Bob'},
  messages: [
    {
      id: 1,
      username: 'Bob',
      content: 'Has anyone seen my marbles?',
    },
    {
      id:2,
      username: 'Anonymous',
      content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
    }
  ]
}


class App extends Component {

  constructor() {
    super();
    this.state = data;
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(username, content) {
    // console.log('calling add message with username: ', username, ' content: ', content);
    // console.log('current state:', this.state);
    let currentMessages = this.state.messages
    const newMessage = {
      id: currentMessages.length+1,
      username,
      content
    }
    currentMessages.push(newMessage);
    this.setState({ messages: currentMessages });
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      this.addMessage('Michelle', 'Hello there!');
    }, 3000);
  }

  render() {
    return (
      <div>
        <NavBar currentUser={this.state.currentUser}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar addMessage={this.addMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}
export default App;
