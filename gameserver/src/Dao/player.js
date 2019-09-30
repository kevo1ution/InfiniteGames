const EventHandler = require('../Service/EventHandler');

class Player extends EventHandler {
  constructor(ws) {
    super();
    this.ws = ws;
    this.tmpData = {};
    this.permData = {};
    this.userid = 'randomId123123';
  }
}

module.exports = Player;
