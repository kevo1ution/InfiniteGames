//requires
const WebSocket = require("ws");

let wss = null;
let eventFuncs = new Map();

//private functions
async function processMsg(ws, msgObj) {
  const eventName = msgObj.name;
  if (eventFuncs.has(eventName)) {
    eventFuncs.get(eventName).forEach(elemFunc => elemFunc(ws, msgObj));
  } else {
    ws.send(JSON.stringify({ name: 'error', error: `Event ${eventName} does not exist.` }));
  }
}

module.exports = {
  setup: async server => {
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
        const msgObj = JSON.parse(msg);
        processMsg(ws, msgObj);
      });
    });

    //heart beat checks
    const interval = setInterval(() => {
      wss.clients.forEach(ws => {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);
  },

  attachFunc: async (eventName, func) => {
    if (eventFuncs.has(eventName)) {
      eventFuncs.get(eventName).push(func);
    } else {
      eventFuncs.set(eventName, [func]);
    }
  },

  detachFunc: async (eventName, func) => {
    eventFuncs.get(eventName).filter(funcElem => funcElem == func);
  },
};
