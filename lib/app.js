const net = require('net');
const { playMessage } = require('./utils/sound');
const ChatRoom = require('./ChatRoom');
const Message = require('./models/Message');
const gradient = require('gradient-string');

const chatRoom = new ChatRoom();

module.exports = net.createServer(connectedClient => {
  chatRoom.add(connectedClient);
  console.log(gradient.vice(`${connectedClient.username} has joined the chatroom`)); 

  connectedClient.on('data', async(data) => {
    const parsedMessage = await Message.log(data.toString(), connectedClient.username);
    const strMessage = JSON.stringify(parsedMessage);
    console.log();
    switch(parsedMessage.command) {
      case 'all':
        chatRoom.all()
          .filter(client => client !== connectedClient)
          .forEach(client => client.write(JSON.stringify(parsedMessage)));
        playMessage(parsedMessage.text).catch(console.log); 
        break;
        
      case 'dm':
        chatRoom.getClient(parsedMessage.args)
          .write(strMessage);
        break;
        
      case 'nickname':
        chatRoom.rename(connectedClient.username, parsedMessage.args);
        break;

      case 'yesterday':
        chatRoom.getYesterday()
          .then(messages => {
            connectedClient.write((JSON.stringify(messages)));
          })
          .catch(err => {
            console.error(err);
          });
        break;

      case 'play':
        chatRoom.play(parsedMessage.args, connectedClient.username)
          .then(messages => {
            connectedClient.write((JSON.stringify(messages)));
          })
          .catch(err => {
            console.error(err);
          });
        break;

      default: 
        connectedClient.write('say wha?');
    }
  });
  // what to do here?
  connectedClient.on('close', function() {
    chatRoom.remove(connectedClient);
  });
  
});
