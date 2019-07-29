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

  it('get a client by its username', () => {
    const client = {};
    chatroom.add(client);

    const result = chatroom.getClient(client.username);
    expect(client).toEqual(result);
  });

  it('renames a client by username', () => {
    const client = {};
    chatroom.add(client);
    chatroom.rename(client.username, 'Erin');
    const result = chatroom.getClient('Erin');
    expect(client).toEqual(result);
    expect(client.username).toEqual('Erin');
  });
});
