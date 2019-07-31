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
  if(dataToStr === '%%%') {
    yesterday = true;
    // we are dealing with yesterday
  } else if(dataToStr === '$$$') {
    yesterday = false;
    playMessage(yesterdaysMessages.join(' '));
    // we are done dealing wirth yesterday
  } else if(yesterday){
    console.log(dataToStr);
    yesterdaysMessages.push(dataToStr.split(': ')[1]);
  } else {
    console.log(`posted on: ${date}`);
    console.log(dataToStr);
    playMessage(dataToStr.split(': ')[1]);
    rl.prompt();
  }
});
