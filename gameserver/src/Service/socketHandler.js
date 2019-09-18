const WebSocketServer = require("websocket").server;
let wsServer;

function originIsAllowed(origin) {
  // TODO: logic for which origins are allowed to connect to websocket
  return true;
}

function listen(server) {
  wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
  });

  wsServer.on("request", function(request) {
    if (!originIsAllowed(request.origin)) {
      request.reject();
      console.log(
        new Date() + " Connection from origin " + request.origin + " rejected."
      );
      return;
    }

    var connection = request.accept("echo-protocol", request.origin);
    console.log(new Date() + " Connection accepted.");
    connection.on("message", function(message) {
      if (message.type === "utf8") {
        console.log("Received Message: " + message.utf8Data);
        connection.sendUTF(message.utf8Data);
      } else if (message.type === "binary") {
        console.log(
          "Received Binary Message of " + message.binaryData.length + " bytes"
        );
        connection.sendBytes(message.binaryData);
      }
    });

    connection.on("close", function(reasonCode, description) {
      console.log(
        new Date() + " Peer " + connection.remoteAddress + " disconnected."
      );
    });
  });
}

module.exports = {
  listen
};
