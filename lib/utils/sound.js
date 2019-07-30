const player = require('play-sound')();

const one = '../../src/assets/tones/a.wav';
const two = '../../src/assets/tones/b.wav';
const three = '../../src/assets/tones/c.wav';
const four = '../../src/assets/tones/d.wav';
const five = '../../src/assets/tones/e.wav';
const six = '../../src/assets/tones/f.wav';
const seven = '../../src/assets/tones/g.wav';
const more = '../../src/assets/tones/h.wav';
// const i = '../../src/assets/tones/i.wav';
// const j = '../../src/assets/tones/j.wav';
// const k = '../../src/assets/tones/k.wav';
// const l = '../../src/assets/tones/l.wav';
// const m = '../../src/assets/tones/m.wav';
// const n = '../../src/assets/tones/n.wav';
// const o = '../../src/assets/tones/o.wav';
// const p = '../../src/assets/tones/p.wav';
// const q = '../../src/assets/tones/q.wav';
// const r = '../../src/assets/tones/r.wav';
// const s = '../../src/assets/tones/s.wav';
// const t = '../../src/assets/tones/t.wav';
// const u = '../../src/assets/tones/u.wav';
// const v = '../../src/assets/tones/v.wav';
// const w = '../../src/assets/tones/w.wav';
// const x = '../../src/assets/tones/x.wav';
// const y = '../../src/assets/tones/y.wav';
// const z = '../../src/assets/tones/z.wav';

const soundMap = { one, two, three, four, five, six, seven, more };
// , f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z };

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
  else if(word.length === 7){
    return 'seven';
  }
  else {
    return 'more';
  }
};
const playMessage = str => {
  return playSong(str.trim().split(' ').map(word => {
    const wordType =  getWordType(word);
    return soundMap[wordType];
  }));
};


//conditionals live in here - by word length
// if soundMap.word 
//1-6 range
// switch() 
//7+ range
//contains a number character
//no sound for spaces
//no vowels, exluding y
//contains double letters? 
module.exports = {
  play,
  playMessage,
  getWordType
};
