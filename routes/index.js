const router = require('express').Router();
const ip = require('ip');
const path = require('path');
const fs = require('fs');

const { writabledir } = global;

router.get('/discovery', (req, res) => {
  res.send('JARPI');
});

router.get('/playground', (req, res) => {
  res.render('playground', {
    currentAddress: `${ip.address()}:5200`,
  });
});

router.get('/', (req, res) => {
  const jerpFilePath = path.join(
    writabledir, 'jerp', 'dist', 'index.html',
  );

  fs.access(jerpFilePath, (err) => {
    if (err) {
      res.render('updating');
      return;
    }

    res.sendFile(jerpFilePath);
  });
});

router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = app => app.use(router);
