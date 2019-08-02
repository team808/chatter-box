const net = require('net');
const readline = require('readline');
const { playMessage } = require('./lib/utils/sound');
const moment = require('moment');
const gradient = require('gradient-string');

const host = process.argv[2] || '192.168.1.218';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

const client = net.createConnection(9999, host, () => {
  console.log(gradient.instagram('You are connected'));
  
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
      console.log(gradient.cristal(`posted on: ${date}`));
      console.log(gradient.instagram(`${message.nickname}: ${message.text}`));
    });
    playMessage(dataObject.map(message => message.text).join(' '));

  } else if(dataObject.command === 'dm') {
    console.log(gradient.cristal(`posted on: ${date}`));
    console.log(gradient.instagram(`dm from ${dataObject.nickname}: ${dataObject.text}`));
    playMessage(dataObject.text);
    
  } else {
    console.log(gradient.instagram(`\n${dataObject.nickname}: ${dataObject.text}`));
    playMessage(dataObject.text);
  }  
  rl.prompt(true);
});
