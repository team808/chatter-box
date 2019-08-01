const net = require('net');
const readline = require('readline');
const { playMessage } = require('./lib/utils/sound');
const moment = require('moment');

const host = process.argv[2] || '192.168.1.115';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

const client = net.createConnection(9999, host, () => {
  console.log('You are connected');
  
  rl.prompt();
  rl.on('line', line => {
    client.write(line);
    rl.prompt();
  });
});

const date = moment().format('MMMM Do YYYY, h:mm:ss a');

client.on('data', data => {
  const dataToStr = data.toString();
  const dataObject = JSON.parse(dataToStr);
  if(dataObject instanceof Array) {
    dataObject.forEach(message => {
      console.log(`${message.nickname}: ${message.text}`);
    });
    playMessage(dataObject.map(message => message.text).join(' '));
  } else {
    console.log(`posted on: ${date}`);
    if(dataObject.command === 'dm') {
      console.log(`dm from ${dataObject.nickname}: ${dataObject.text}`);
    } else {
      console.log(`${dataObject.nickname}: ${dataObject.text}`);
    }
    playMessage(dataObject.text);
    rl.prompt(true);
  }
});
