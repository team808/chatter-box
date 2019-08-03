const net = require('net');
const gradient = require('gradient-string');
const ChatRoom = require('./ChatRoom');
const Message = require('./models/Message');

const chatRoom = new ChatRoom();

module.exports = net.createServer(connectedClient => {
  // make writing easier
  connectedClient.writeJSON = json => connectedClient.write(JSON.stringify(json));
  chatRoom.add(connectedClient);
  console.log(gradient.vice(`${connectedClient.username} has joined the chatroom`));

  connectedClient.on('data', async(data) => {
    const parsedMessage = await Message.log(data.toString(), connectedClient.username);
    console.log();
    switch(parsedMessage.command) {
      case 'all':
        chatRoom.all()
          .filter(client => client !== connectedClient)
          .forEach(client => client.writeJSON(parsedMessage));
        break;

      case 'dm':
        chatRoom.getClient(parsedMessage.args)
          .writeJSON(parsedMessage);
        break;

      case 'nickname':
        chatRoom.rename(connectedClient.username, parsedMessage.args);
        break;

      case 'yesterday':
        chatRoom.getYesterday()
          .then(messages => connectedClient.writeJSON(messages))
          .catch(console.err);
        break;

      case 'play':
        chatRoom.play(parsedMessage.args, connectedClient.username)
          .then(messages => connectedClient.writeJSON(messages))
          .catch(console.error);
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
