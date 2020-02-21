const _ = require('lodash');
const debug = require('debug')('jarpi:server');
const express = require('express');
const http = require('http');
const swig = require('swig');
const fs = require('fs');
const path = require('path');
const socketIo = require('socket.io');
const ms = require('ms');
const emitter = require('./events');

const { writabledir } = global;

const app = express();
const server = http.Server(app);

const io = socketIo(server, {
  path: '/socket',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
});

io.on('connection', (client) => {
  client.use((packet, next) => {
    debug('%o', packet);

    const eventName = _.toString(packet[0]);
    let params = typeof packet[1] === 'object' && packet[1] ? packet[1] : {};

    if (Object.keys(params).length) {
      params = Object.assign(
        ...Object.keys(params).map(key => ({
          [key]: params[key] !== '' ? params[key] : null,
        })),
      );
    }

    emitter.emit(eventName, params, (...args) => {
      if (args[0]) {
        debug('%o', ...args);
      } else if (!/all|find|next|util/gi.test(eventName)) {
        io.emit(`${eventName.split('::')[0]}::change`);
      }

      if (typeof packet[1] === 'function') {
        packet[1](...args);
        return;
      }

      if (typeof packet[2] === 'function') {
        packet[2](...args);
      }
    });
  });
});

swig.setDefaults({
  cache: false,
  locals: {
    year() {
      return _(new Date()).value().getFullYear();
    },
  },
});

app.engine('swig', swig.renderFile);

app.set('trust proxy');
app.set('view engine', 'swig');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(writabledir, 'jerp', 'dist')));

require('./routes')(app);

setTimeout(() => {
  const port = 5200;
  server.listen({ port }, () => {
    debug(`Listening on port ${port}`);
  });
}, ms('5s'));
