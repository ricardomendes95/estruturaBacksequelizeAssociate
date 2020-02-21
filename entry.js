const debug = require('debug')('jarpi:errors');
const io = require('socket.io-client');
const hidefile = require('hidefile');
const os = require('os');
const fs = require('fs');
const path = require('path');

global.api = io('https://api.jesistemas.com.br', { path: '/socket' });
global.writabledir = path.join(os.homedir(), '.jarpi');

const { api, writabledir } = global;

function logErrors(...args) {
  api.emit('jarpi::error', args.toString());
  debug(...args);
}

process.on('uncaughtException', logErrors);
process.on('unhandledRejection', logErrors);

if (!fs.existsSync(writabledir)) {
  fs.mkdirSync(writabledir);
  hidefile.hideSync(writabledir);
}

require('./env');
require('./server');
require('./tasks');
