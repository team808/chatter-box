const net = require('net');
const readline = require('readline');
const { playMessage } = require('./lib/utils/sound');
const moment = require('moment');
const gradient = require('gradient-string');

const host = process.argv[2] || '192.168.1.115';

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

let partial = '';
client.on('data', data => {

  const dataToStr = data.toString();
  let dataObject = null;
  try {
    dataObject = JSON.parse(partial + dataToStr);
    partial = '';
  } catch(e) {
    partial += dataToStr;
    //our way of saying exit, return here and wait for the next message
    return;
  }

  //get a letter from the server that hass an array take this and parse it inseated of a letter you gt an actuall array; problem recieving a letter with no ending bracket meaning not an entier letter;; lets' add whatever we get to a string which is a partial letter so then grab whatever is in this string then add the partial then that should be able to be parsed; smashing the letters until it's all completed message


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
