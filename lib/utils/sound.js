const player = require('play-sound')();

const a = '../../src/assets/tones/a.wav';
const b = '../../src/assets/tones/b.wav';
const c = '../../src/assets/tones/c.wav';
const d = '../../src/assets/tones/d.wav';
const e = '../../src/assets/tones/e.wav';
const f = '../../src/assets/tones/f.wav';
const g = '../../src/assets/tones/g.wav';
const h = '../../src/assets/tones/h.wav';
const i = '../../src/assets/tones/i.wav';
const j = '../../src/assets/tones/j.wav';
const k = '../../src/assets/tones/k.wav';
const l = '../../src/assets/tones/l.wav';
const m = '../../src/assets/tones/m.wav';
const n = '../../src/assets/tones/n.wav';
const o = '../../src/assets/tones/o.wav';
const p = '../../src/assets/tones/p.wav';
const q = '../../src/assets/tones/q.wav';
const r = '../../src/assets/tones/r.wav';
const s = '../../src/assets/tones/s.wav';
const t = '../../src/assets/tones/t.wav';
const u = '../../src/assets/tones/u.wav';
const v = '../../src/assets/tones/v.wav';
const w = '../../src/assets/tones/w.wav';
const x = '../../src/assets/tones/x.wav';
const y = '../../src/assets/tones/y.wav';
const z = '../../src/assets/tones/z.wav';

const soundMap = { a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z };

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
  console.log(arr);
  await arr.reduce(async(acc, beat) => [
    ...await acc,
    await play(beat)
  ], await[]);
};

const playMessage = str => {
  return playSong(str.trim().split('').map(letter => {
    return soundMap[letter];
  }));
};

module.exports = {
  play,
  playMessage
};
