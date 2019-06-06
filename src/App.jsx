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

  addMessage = (event) => {
    if (event.charCode == 13) {
      const content = event.target;
      // Preparing message and sending to the server
      const newMessageToServer = {
        username: this.state.currentUser.name,
        content: content.value
      }
      this.socket.send(JSON.stringify(newMessageToServer));
      content.value = "";
    }
  }

  updateUserName = (event) => {
    if (event.charCode == 13) {
      this.setState({currentUser: {name: event.target.value}}, () => {
        console.log(`current user: ${this.state.currentUser.name}`)
      });
    } 
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
        <ChatBar addMessage={this.addMessage} currentUser={this.state.currentUser} updateUserName={this.updateUserName}/>
      </div>
    );
  }
}
export default App;
