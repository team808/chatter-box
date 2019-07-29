const { createServer } = require('net');

const clients = [];

const app = createServer(sock => {
  clients.push(sock);
  sock.on('data', data => {
    clients.forEach(client => {
      client.write(data);
    });

  });
});


module.exports = { app };
