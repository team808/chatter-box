const uuid = require('uuid/v4');
const Message = require('./models/Message');

module.exports = class Chatroom {
  constructor() {
    this.clients = new Map();
  }
  add(client) {
    const username = uuid();
    client.username = username;
    this.clients.set(username, client);
    // console.log(this.clients)
    return client;
  }

  getClient(username) {
    return this.clients.get(username);
  }

  rename(oldUsername, newUsername) {
    if(this.clients.has(newUsername))
      return null;
    const client = this.getClient(oldUsername);
    client.username = newUsername;

    this.clients.set(newUsername, client);
    this.clients.delete(oldUsername);

    return client;
  }

  all() { 
    return [...this.clients.values()];
  }

  getYesterday() { 
    const yesterday = () => {
      const now = new Date();
      now.setDate(0);
      return now;
    };
    return Message.find({
      command: 'all', 
      createdAt: {
        $gt: yesterday(), 
        $lt: Date.now()
      }
    });
  }

  // @play:dm
  //find art nickname of yourself
  //command dm

  remove(client) {
    this.clients.delete(client.username);
  } 

};
