const uuid = require('uuid/v4');
const Message = require('./models/Message');

const pastDate = daysBack => {
  const now = new Date();
  now.setDate(daysBack);
  return now;
};

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
    return Message.find({
      command: 'all',
      createdAt: {
        $gt: pastDate(0),
        $lt: Date.now()
      }
    });
  }

  play(sentFrom, requester) {
    return Message.find({
      command: 'dm',
      nickname: sentFrom,
      args: requester,
      createdAt: {
        $gt: pastDate(-30),
        $lt: Date.now()
      }
    });
  }

  remove(client) {
    this.clients.delete(client.username);
  }

};
