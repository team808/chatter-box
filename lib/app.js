const { createServer } = require('net');
const parseMessages = require('../lib/parseMessages');
const { playMessage } = require('./utils/sound');

const clients = [];

const app = createServer(client => {
  clients.push(client);
  client.on('data', data => {
    const parsedMessage = parseMessages(data.toString());
    playMessage(data.toString());
    clients.forEach(client => {
      client.write(data);
    });

  });
});


module.exports = { app };
