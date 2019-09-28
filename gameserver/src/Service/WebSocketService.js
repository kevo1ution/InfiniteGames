//requires
const WebSocket = require("ws");
const EventHandler = require('./EventHandler')

class WebSocketService extends EventHandler{
  constructor(){
    super();
    this.wss = null;
    this.msgEventFuncs = new Map();
    this.onConnectFuncs = [];

    const eventNames = ['connection', '']
  }

  async setup(server){
    this.wss = new WebSocket.Server({
      server
    });

    this.wss.on("connection", ws => {
      //detect closed or broken communications
      ws.isAlive = true;
      ws.on("pong", () => {
        ws.isAlive = true;
      });

      ws.on("message", msg => {
        const msgObj = JSON.parse(msg);
        this.processMsg(ws, msgObj);
      });
    });

    //heart beat checks
    setInterval(() => {
      this.wss.clients.forEach(ws => {
        if (ws.isAlive === false) return ws.terminate();
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000);
  }

  async processMsg(ws, msgObj) {
    const eventName = msgObj.name;
    if (this.msgEventFuncs.has(eventName)) {
      this.msgEventFuncs.get(eventName).forEach(elemFunc => elemFunc(ws, msgObj));
    } else {
      ws.send(JSON.stringify({ name: 'error', error: `Event ${eventName} does not exist.` }));
    }
  }

  async onMsgEvent(eventName, func){
    if (this.msgEventFuncs.has(eventName)) {
      this.msgEventFuncs.get(eventName).push(func);
    } else {
      this.msgEventFuncs.set(eventName, [func]);
    }
  }

  async onMsgEventDisconnect (eventName, func){
    this.msgEventFuncs.get(eventName).filter(funcElem => funcElem == func);
  }
}

const WebSocketServiceObj = new WebSocketService();
module.exports = WebSocketServiceObj