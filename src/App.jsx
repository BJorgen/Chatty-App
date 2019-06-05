import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
  }

  addMessage = (username, content) => {
    // Preparing message and sending to the server
    const newMessageToServer = {
      username,
      content
    }
    this.socket.send(JSON.stringify(newMessageToServer));
  }



  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3001');
    // Update the state with incoming messages from the server
    this.socket.onmessage = event => {
    	this.setState({
      	messages : this.state.messages.concat([ JSON.parse(event.data) ])
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
