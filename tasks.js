const { promisify } = require('util');
const debug = require('debug')('jarpi:tasks');
const moment = require('moment');
const ms = require('ms');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const unzipper = require('unzipper');
const emitter = require('./events');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const { writabledir, api } = global;

setTimeout(() => {
  emitter.emit('util::migrate');
}, ms('0s'));

setInterval((function jerpUpdate() {
  api.emit('jerp::latestBuild', (err, { latestBuild, downloadUrl }) => {
    if (err) {
      debug('%o', err);
      return;
    }

    fs.access(path.join(writabledir, 'jerp', 'dist', 'index.html'), async (error) => {
      if (!error) {
        const { build } = JSON.parse((await readFile(path.join(
          writabledir, 'jerp', 'dist', 'version.json',
        ))));

        if (build >= latestBuild) {
          return;
        }
      }

      fs.mkdirSync(path.join(writabledir, 'jerp'), {
        recursive: true,
      });

      const response = await axios({
        url: downloadUrl,
        method: 'GET',
        responseType: 'stream',
      });

      const writer = fs.createWriteStream(path.resolve(writabledir, 'jerp', 'dist.zip'));
      response.data.pipe(writer);

      writer.on('finish', () => {
        const readStream = fs.createReadStream(path.join(
          writabledir, 'jerp', 'dist.zip',
        ));

        readStream.pipe(unzipper.Extract({
          path: path.join(writabledir, 'jerp'),
        }));

        readStream.on('close', async () => {
          fs.unlink(
            path.join(writabledir, 'jerp', 'dist.zip'),
            () => {},
          );

          await writeFile(
            path.join(writabledir, 'jerp', 'dist', 'version.json'),
            JSON.stringify({ build: latestBuild }, null, 2),
          );
        });
      });

      writer.on('error', (...args) => {
        debug('Falha ao tentar obter arquivo de atualização do JERP: %o', args);
      });
    });
  });

  return jerpUpdate;
}()), ms('5m'));

setInterval((function updateStatesList() {
  (async () => {
    const states = (await axios.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
    )).data;

    fs.writeFileSync(
      path.join(writabledir, 'states.json'),
      JSON.stringify(states, null, 2),
    );
  })();

  return updateStatesList;
}()), ms('3d'));

setInterval((function updateCitiesList() {
  (async () => {
    const cities = (await axios.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/municipios',
    )).data;

    fs.writeFileSync(
      path.join(writabledir, 'cities.json'),
      JSON.stringify(cities, null, 2),
    );
  })();

  return updateCitiesList;
}()), ms('1d'));
