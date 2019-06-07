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
function getRandomColor(){
  const colours = ['#E27D60' , '#659DBD' , '#C38D9E', '#41B3A3'];
  const colour = colours[Math.floor(Math.random()*colours.length)];
  return colour;
}

wss.on('connection', (ws) => {
  // Callback instructions for after a user has connected
  console.log('Client connected');
  numberOfConnections++;
  updateUsers(wss.clients);
  const userColour = getRandomColor();


  ws.on('message', function incoming(message) {
    const incoming= JSON.parse(message);
    incoming.id = uuidv1();
    incoming.colour = userColour;
    
    wss.clients.forEach(function each(client) {
      if (client !== ws && incoming.type === "postMessage"){
        incoming.type = "incomingMessage";
      }
      if (client !== ws && incoming.type === "postNotification"){
        incoming.type = "incomingNotification";
      }
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(incoming));
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