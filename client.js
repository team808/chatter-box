const net = require('net');
const readline = require('readline');
const moment = require('moment');
const gradient = require('gradient-string');
const { playMessage } = require('./lib/utils/sound');

const host = process.argv[2] || 'localhost';

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

let partial = '';
client.on('data', data => {
  const dataToStr = data.toString();
  let dataObject = null;
  try {
    dataObject = JSON.parse(partial + dataToStr);
    partial = '';
  } catch(e) {
    partial += dataToStr;
    return;
  }

  if(dataObject instanceof Array) {
    dataObject.forEach(print);
    playMessage(dataObject.map(message => message.text).join(' '));
  } else if(dataObject.command === 'dm') {
    print(dataObject, 'dm from ');
    playMessage(dataObject.text);
  } else {
    print(dataObject);
    playMessage(dataObject.text);
  }
  rl.prompt(true);
});

function print(message, prefix = '') {
  const date = moment().format('MMMM Do YYYY, h:mm:ss a');
  console.log(gradient.cristal(`posted on: ${date}`));
  console.log(gradient.instagram(`\n${prefix}${message.nickname}: ${message.text}`));
}
