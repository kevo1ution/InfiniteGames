const WebSocket = require("ws");
let wss;

function originIsAllowed(origin) {
  // TODO: logic for which origins are allowed to connect to websocket
  return true;
}

function listen(server) {
  wss = new WebSocket.Server({
    server
  });

  wss.on("connection", ws => {
    //detect closed or broken communications
    ws.isAlive = true;
    ws.on("pong", () => {
      ws.isAlive = true;
    });

    ws.on("message", msg => {
      console.log("received: %s", msg);
    });

    ws.send(JSON.stringify({a: 'this', b: 'is', c:'test'}))
  });

  //heart beat checks
  const interval = setInterval(()=>{
    wss.clients.forEach((ws)=>{
      if(ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping()
    })
  }, 30000)
}

module.exports = {
  listen
};
