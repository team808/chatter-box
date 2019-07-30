const net = require('net');
const readline = require('readline');
const { playMessage } = require('./lib/utils/sound');

const host = process.argv[2] || '192.168.1.218';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

const client = net.createConnection(9999, host, () => {
  console.log('I am connected');
  
  rl.prompt();
  rl.on('line', line => {
    client.write(line);
    rl.prompt();
  });
});

client.on('data', data => {
  console.log(data.toString());
  playMessage(data.toString().split(': ')[1]);
  rl.prompt();
});