const player = require('play-sound')();
  
const one = '../../src/assets/tones/one.mp3';
const two = '../../src/assets/tones/two.mp3';
const three = '../../src/assets/tones/three.mp3';
const four = '../../src/assets/tones/four.mp3';
const five = '../../src/assets/tones/five.mp3';
const six = '../../src/assets/tones/six.mp3';
const seven = '../../src/assets/tones/seven.mp3';
const hello = '../../src/assets/tones/hello.mp3';
const error = '../../src/assets/tones/error.wav';
const leighann = '../../src/assets/tones/leighann.mp3';
const sad = '../../src/assets/tones/sad.mp3';
const dirt = '../../src/assets/tones/dirt.mp3';
const alchemy = '../../src/assets/tones/alchemy.mp3';
const erin = '../../src/assets/tones/erin.mp3';
const coding = '../../src/assets/tones/coding.mp3';
const ryan = '../../src/assets/tones/ryan.wav';
const happy = '../../src/assets/tones/happy.mp3';
const lance = '../../src/assets/tones/lance.mp3';
const paige = '../../src/assets/tones/paige.mp3';
const oo = '../../src/assets/tones/oo.mp3';
const ll = '../../src/assets/tones/ll.mp3';
const ee = '../../src/assets/tones/ee.mp3';


const soundMap = { one, two, three, four, five,
  six, seven, hello, error, leighann, sad, dirt, 
  alchemy, erin, coding, ryan, lance, happy, 
  paige, oo, ll, ee };

const play = (sound) => {
  return new Promise((resolve, reject) => {
    player.play(`${__dirname}/${sound}`, (err) => {
      if(err) {
        console.log(err, 'error');
        return reject(err);
      }
      resolve();
    });
  });
};

const playSong = async(arr) => {
  await arr.reduce(async(acc, beat) => [
    ...await acc,
    await play(beat)
  ], await[]);
};

const getWordType = (word) => {

  if(word.length === 1) {
    return 'one';
  } else if(word.toLowerCase().includes('hello')){
    return 'hello';
  } else if(word.toLowerCase().includes('dirt')){
    return 'dirt';
  } else if(word.toLowerCase().includes('leighann')){
    return 'leighann';
  } else if(word.toLowerCase().includes('erin')){
    return 'erin';
  } else if(word.toLowerCase().includes('alchemy')){
    return 'alchemy';
  } else if(word.toLowerCase().includes('coding')){
    return 'coding';
  } else if(word.toLowerCase().includes('lance')){
    return 'lance';
  } else if(word.toLowerCase().includes('ryan')){
    return 'ryan';
  } else if(word.toLowerCase().includes('paige')){
    return 'paige';
  } else if(word.toLowerCase().includes('sad')){
    return 'sad';
  } else if(word.toLowerCase().includes('happy')){
    return 'happy';
  } else if(word.toLowerCase().includes('oo')){
    return 'oo';
  } else if(word.toLowerCase().includes('ll')){
    return 'll';
  } else if(word.toLowerCase().includes('ee')){
    return 'ee';
  } else if(word.length === 2){
    return 'two';
  } else if(word.length === 3){
    return 'three';
  } else if(word.length === 4){
    return 'four';
  } else if(word.length === 5){
    return 'five';
  } else if(word.length === 6){
    return 'six';
  } else if(word.length === 7){
    return 'seven';
  } else if(word.length === 40){
    return 'error';
  } else {
    return 'fifteen';
  }
};

const playMessage = str => {
  return playSong(str.trim().split(' ').map(word => {
    const wordType =  getWordType(word);
    return soundMap[wordType];
  }));
};

module.exports = {
  play,
  playMessage,
  getWordType
};
