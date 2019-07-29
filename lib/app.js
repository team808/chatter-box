const net = require('net');
const parseMessages = require('../lib/parseMessages');
const { playMessage } = require('./utils/sound');
const ChatRoom = require('./ChatRoom');

const chatRoom = new ChatRoom();

module.exports = net.createServer(connectedClient => {
  chatRoom.add(connectedClient);
  console.log(`${connectedClient.username} has joined the chatroom`);

  connectedClient.on('data', data => {
    const parsedMessage = parseMessages(data.toString());
    if(!parsedMessage) return connectedClient.write('Sorry, invalid');
    console.log(parsedMessage);
    
    switch(parsedMessage.command) {
      case 'all':
        chatRoom.all()
          .filter(client => client !== connectedClient)
          .forEach(client => client.write(`${connectedClient.username}: ${parsedMessage.text}`));
        playMessage(parsedMessage.text).catch(console.log);
        break;

      case 'dm':
        chatRoom.getClient(parsedMessage.args)
          .write(`dm from ${connectedClient.username}: ${parsedMessage.text}`);
        break;
      
      case 'nickname':
        chatRoom.rename(connectedClient.username, parsedMessage.args);
        break;

      default: 
        connectedClient.write('say wha?');
    }
  });
});
