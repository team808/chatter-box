const player = require('play-sound')();
  
const one = '../../src/assets/tones/one.mp3';
const two = '../../src/assets/tones/two.mp3';
const three = '../../src/assets/tones/three.mp3';
const four = '../../src/assets/tones/four.mp3';
const five = '../../src/assets/tones/five.mp3';
const six = '../../src/assets/tones/six.mp3';
const seven = '../../src/assets/tones/seven.mp3';

const soundMap = { one, two, three, four, five, six, seven };

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
  } else if(word.length === 2){
    return 'two';
  } else if(word.length === 3){
    return 'three';
  }
  else if(word.length === 4){
    return 'four';
  }
  else if(word.length === 5){
    return 'five';
  }
  else if(word.length === 6){
    return 'six';
  }
  else {
    return 'seven';
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

