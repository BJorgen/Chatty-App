import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      numberOfUsers: 0
    };
  }

  addMessage = (event) => {
    if (event.charCode == 13) {
      const content = event.target;
      // Preparing message and sending to the server
      const newMessageToServer = {
        type: "postMessage",
        username: this.state.currentUser.name,
        content: content.value
      }
      this.socket.send(JSON.stringify(newMessageToServer));
      content.value = "";
    }
  }


  updateUserName = (event) => {
    if (event.charCode == 13) {
      const oldUsername = this.state.currentUser.name;
      const newUsername = event.target.value;
      this.setState({currentUser: {name: newUsername}}, () => {
        console.log(`current user: ${this.state.currentUser.name}`)
        // Preparing message and sending to the server
        const newNotificationToServer = {
          type: "postNotification",
          username: newUsername,
          content: `${oldUsername} changed their name to ${newUsername}.`
        }
        this.socket.send(JSON.stringify(newNotificationToServer))
      });
    } 
  }

  componentDidMount(){
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

    this.socket.onmessage = event => {
      // console.log(event);
      const data = JSON.parse(event.data);
      console.log(data)
      // Update the state with incoming messages from the server
      switch(data.type) {
        case "incomingMessage":
        case "postMessage":
        case "incomingNotification":
        case "postNotification":
          this.setState({
            messages : this.state.messages.concat([data])
          })
          break;
        case "updateUsers":
          this.setState({
            numberOfUsers : data.content
          })
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);

      }
    };
  }

  render() {
    return (
      <div>
        <NavBar currentUser={this.state.currentUser} numberOfUsers={this.state.numberOfUsers}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar addMessage={this.addMessage} currentUser={this.state.currentUser} updateUserName={this.updateUserName}/>
      </div>
    );
  }
}

export default App;
