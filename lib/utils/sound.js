const fs = require('fs');
const path = require('path');
const player = require('play-sound')();

// place assets dir variable here for easy reuse
const assetsDir = __dirname + '/../../src/assets/tones';

// Read the contents of the assets directory
// this will be used to create our soundMap
const dir = fs.readdirSync(assetsDir);

// Use reduce to create our soundMap.
// iterate through all files in the assets directory
const baseSoundMap = dir.reduce((acc, file) => {
  // get the file extension (mp3 or wav)
  const extension = path.extname(file);

  // get the name of the file alchemy, coding, dirt, ee, etc.
  const fileName = path.basename(file, extension);

  // add a key to our acc who's value is the path to a sound file
  acc[fileName] = `${assetsDir}/${file}`;
  return acc;
}, {});

// create a Proxy handler (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
// Proxies allow us to control how an object is accessed
// the get function below is hit any time the object is accessed
// via dot or bracket notation. (e.g. soundMap.hello or soundMap['hello'])
// instead of returning the value inside the object, it will return
// the value returned by the get function. This is useful for handling
// default cases.
const defaultHandler = {
  get: function(obj, prop) {
    // check if the baseSoundMap object contains:
    // 1) the word (e.g. alchemy, coding, dirt, ee, etc)
    // 2) the length of the word (e.g. 1, 2, 3, etc)
    // 3) otherwise default to 15
    return obj[prop.toLowerCase()] ||
      obj[prop.length] ||
      obj['15'];
  }
};

// Create our soundMap by Proxying our baseSoundMap.
// https://repl.it/@RyanMehta/proxy
const soundMap = new Proxy(baseSoundMap, defaultHandler);

const play = sound => {
  return new Promise((resolve, reject) => {
    player.play(sound, (err) => {
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
  ], await []);
};
const playMessage = str => {
  return playSong(str
    .trim()
    .split(' ')
    .map(word => soundMap[word]));
};

module.exports = {
  play,
  playMessage
};
