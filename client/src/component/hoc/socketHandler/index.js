import WebSocket from 'websocket';
const W3CWebSocket = WebSocket.w3cwebsocket;

const client = new W3CWebSocket("ws://localhost:8080/", "echo-protocol");

client.onerror = function() {
  console.log("Connection Error");
};

client.onopen = function() {
  console.log("WebSocket Client Connected");

  function sendNumber() {
    if (client.readyState === client.OPEN) {
      var number = Math.round(Math.random() * 0xffffff);
      client.send(number.toString());
      setTimeout(sendNumber, 1000);
    }
  }
  sendNumber();
};

client.onclose = function() {
  console.log("echo-protocol Client Closed");
};

client.onmessage = function(e) {
  if (typeof e.data === "string") {
    console.log("Received: '" + e.data + "'");
  }
};
