const uuid = require('uuid/v4');

module.exports = class Chatroom {
  constructor() {
    this.clients = new Map();
  }
  add(client) {
    const username = uuid();
    client.username = username;
    this.clients.set(username, client);
    return client;
  }

};
