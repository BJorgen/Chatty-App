const express = require('./node_modules/express');
const SocketServer = require('./node_modules/ws').Server;
const uuidv1 = require('./node_modules/uuid/v1');
const WebSocket = require('./node_modules/ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Keep track of number of ws connections and notify connected users of this number
let numberOfConnections = 0;

function updateUsers(clients) {
  clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({type:"updateUsers", content:numberOfConnections}));
    }
  });
}
// Array of colors to assign to clients
function getRandomColour(){
  const colours = ['#E27D60' , '#659DBD' , '#C38D9E', '#41B3A3'];
  const colour = colours[Math.floor(Math.random()*colours.length)];
  return colour;
}

wss.on('connection', (ws) => {
  // Callback instructions for after a user has connected
  console.log('Client connected');
  numberOfConnections++;
  updateUsers(wss.clients);
  const userColour = getRandomColour();


  ws.on('message', function incoming(message) {
    let incoming;
    try {
      incoming= JSON.parse(message);
     } catch (error) { 
       console.log(error); 
       return;
      }
      
      let response = {
        content: incoming.content,
        username: incoming.username,
        type: incoming.type,
        id: uuidv1(),
        colour: userColour
      }

    wss.clients.forEach(function each(client) {
      
      if (client !== ws) {
        switch(response.type) {
          case 'postMessage':
            response.type = 'incomingMessage';
            break;
          case 'postNotification':
            response.type = 'incomingNotification';
            break;
          default:
            throw new Error('Unknown event type ' + data.type);
        }
      }
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(response));
      }
    });
  });

  // Set up a callback for when a client closes the socket.
  ws.on('close', () => {
    console.log('Client disconnected');
    numberOfConnections--;
    updateUsers(wss.clients);
  });

});