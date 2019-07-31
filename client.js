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
  console.log('I am connected');
  
  rl.prompt();
  rl.on('line', line => {
    client.write(line);
    rl.prompt();
  });
});

const date = moment().format('MMMM Do YYYY, h:mm:ss a');

let yesterday = false;
let yesterdaysMessages = [];

client.on('data', data => {
  const dataToStr = data.toString();
  if(dataToStr.startsWith('%%%') && dataToStr.endsWith('$$$')) {
    console.log('hit case 1'); // TODO: remove this
    const messages = dataToStr.split('\n').slice(1);
    messages.forEach(message => {
      console.log(message);
      yesterdaysMessages.push(message.split(': ')[1]);
    });
    playMessage(yesterdaysMessages.join(' '));
  } else if(dataToStr.startsWith('%%%')) {
    console.log('hit case 2', dataToStr); // TODO: remove this
    yesterdaysMessages = []; 
    yesterday = true;
    const messages = dataToStr.slice(3).split('\n');
    messages.forEach(message => {
      console.log(message);
      yesterdaysMessages.push(message.split(': ')[1]);
    });
  } else if(dataToStr.endsWith('$$$')) {
    console.log('hit case 3'); // TODO: remove this
    yesterday = false;
    const messages = dataToStr.split('\n').slice(0, -1);
    messages.forEach(message => {
      console.log(message);
      yesterdaysMessages.push(message.split(': ')[1]);
    });
    playMessage(yesterdaysMessages.join(' '));
  } else if(yesterday){
    console.log('hit case 4'); // TODO: remove this
    console.log(dataToStr);
    yesterdaysMessages.push(dataToStr.split(': ')[1]);
  } else {
    console.log(`posted on: ${date}`);
    console.log(dataToStr);
    playMessage(dataToStr.split(': ')[1]);
    rl.prompt(true);
  }
});
