// requires
const EventHandler = require('./EventHandler');
const WebSocketService = require('./WebSocketService');
const Player = require('../Dao/player');

const PlayerList = [];

class PlayerService extends EventHandler {
  constructor() {
    super();

    // setup valid events
    const eventNames = ['playerAdded', 'playerRemoved'];
    eventNames.forEach((eventName) => this.eventFuncs.set(eventName, []));

    // attach function to websocketservice events
    WebSocketService.onEvent('connection', ({ ws }) => {
      // create a new player and attach to websocket
      const player = new Player(ws);
      ws.player = player;

      this.fireEvent('playerAdded', { player });
    });

    WebSocketService.onEvent('disconnect', ({ ws, number, reason }) => {
      const { player } = ws;
      console.log(player);

      this.fireEvent('playerRemoved', { player });
    });
  }

  async setup(app, db) {

  }

  async getPlayers() {
    return [...PlayerList];
  }
}

const PlayerServiceObj = new PlayerService();
module.exports = PlayerServiceObj;
