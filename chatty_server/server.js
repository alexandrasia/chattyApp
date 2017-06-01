// server.js

const express = require("express");
const SocketServer = require("ws").Server;
const uuidV4 = require("uuid/v4");

// Port set to 3001
const PORT = 3001;

// New express server
const server = express()
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// WebSockets server
const wss = new SocketServer({ server });

// Broadcasts data to client
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  });
};

// Handles incoming messages and notifications from client and calls on broadcast
function handleMessage(data) {
  data = JSON.parse(data);
  data.id = uuidV4();

  if (data.type === "postNotification") {
    data.type = "incomingNotification";
  } else if (data.type === "postMessage") {
    data.type = "incomingMessage";
  } else {
    data.type = "nonsense, please ignore";
  }
  wss.broadcast(data);
}

wss.on("connection", function connection(client) {
  function updateOnlineCount() {
    wss.broadcast({
      id: uuidV4(),
      type: "onlineUsers",
      onlineUsers: wss.clients.size
    });
  }

  updateOnlineCount();

  client.on("message", handleMessage);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  client.on("close", () => {
    updateOnlineCount();
  });
});
