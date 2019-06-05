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

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
  }

  addMessage = (username, content) => {
    let currentMessages = this.state.messages
    const newMessage = {
      id: currentMessages.length+1,
      username,
      content
    }
    currentMessages.push(newMessage);
    this.setState({ messages: currentMessages });
    this.socket.send(JSON.stringify(newMessage))
  }

  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3001');
    
    this.socket.onmessage = event => { 
    	this.setState({
      	messages : this.state.messages.concat([ event.data ])
      })
    };
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
