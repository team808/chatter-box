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
    console.log(this.clients)
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
      return new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - 1}`);
    };
    return Message.find({
      createdAt: {
        $gt: yesterday(), 
        $lt: Date.now()
      }
    });
  }

  remove(client) {
    this.clients.delete(client.username);
  } 

};
