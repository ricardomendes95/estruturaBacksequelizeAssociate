const { EventEmitter2 } = require('eventemitter2');
const fs = require('fs');
const db = require('../models');

const emitter = new EventEmitter2({
  delimiter: '::',
});

for (const filename of fs.readdirSync(__dirname)) {
  if (!/index.js$/i.test(filename) && filename.slice(-3) === '.js') {
    require(`./${filename}`)(emitter, db);
  }
}

module.exports = emitter;
