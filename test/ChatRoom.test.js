const ChatRoom = require('../lib/ChatRoom');

describe('chatroom tests', () => {
  let chatroom = null;
  beforeEach(() => {
    chatroom = new ChatRoom();
  });

  it('add a new client to chatroom', () => {
    const client = {};
    const result = chatroom.add(client);
    expect(result.username).toEqual(expect.any(String));
    expect(client.username).toEqual(result.username);
  });
});
