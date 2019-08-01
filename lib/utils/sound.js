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

const soundMap = { one, two, three, four, five, six, seven, hello, error };

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
    return 'eleven';
  } else if(word.toLowerCase().includes('leighann')){
    return 'thirteen';
  } else if(word.toLowerCase().includes('erin')){
    return 'fourteen';
  } else if(word.toLowerCase().includes('alchemy')){
    return '';
  } else if(word.toLowerCase().includes('coding')){
    return '';
  } else if(word.toLowerCase().includes('ryan')){
    return '';
  } else if(word.toLowerCase().includes('sad')){
    return '';
  } else if(word.toLowerCase().includes('happy')){
    return '';
  } else if(word.toLowerCase().includes('oo')){
    return '';
  } else if(word.toLowerCase().includes('ll')){
    return '';
  } else if(word.toLowerCase().includes('ee')){
    return '';
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