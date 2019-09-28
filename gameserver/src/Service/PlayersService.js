//requires
const EventHandler = require('./EventHandler')
const WebSocketService = require('./WebSocketService');
const PlayerList = [];

class PlayerService extends EventHandler{
  constructor(){
    super();

    //setup valid events
    const eventNames = ['playerAdded', 'playerRemoved']
    eventNames.forEach(eventName => this.eventFuncs.set(eventName, []));

  }

  async setup (app, db){
    //attach to webSocketService
  }

  async getPlayers (){
    return [...PlayerList];
  }
}

const PlayerServiceObj = new PlayerService();
module.exports = PlayerServiceObj
