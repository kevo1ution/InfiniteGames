
class EventHandler {
  constructor() {
    this.eventFuncs = new Map();
  }

  async fireEvent(eventName, obj) {
    this.eventFuncs.get(eventName).forEach((eventFunc) => {
      eventFunc(obj);
    });
  }

  // event attachments
  async onEvent(eventName, func) {
    if (this.eventFuncs.has(eventName)) {
      this.eventFuncs.get(eventName).push(func);
    } else {
      this.eventFuncs.set(eventName, [func]);
    }
  }

  async onEventDisconnect(eventName, func) {
    this.eventFuncs.set(
      eventName,
      this.eventFuncs.get(eventName).filter((funcElem) => funcElem != func),
    );
  }
}

module.exports = EventHandler;
