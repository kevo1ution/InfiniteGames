const EventHandler = require('../Service/EventHandler');

class Player extends EventHandler {
  constructor(ws) {
    this.ws = ws;
    this.tmpData = {};
    this.permData = {};
    this.userid = 'randomId123123';
  }
}

module.exports = Player;
