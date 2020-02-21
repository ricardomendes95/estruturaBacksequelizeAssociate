const _ = require('lodash');
const fs = require('fs');
const path = require('path');

module.exports = (emitter, models) => {
  emitter.on('tribute::findByNcm', async (params, callback) => {
    const tribute = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '..', 'storage', 'tribute.json'),
      ),
    );

    const ncm = tribute.find((tributeItem) => {
      return tributeItem.ncm === _.trimStart(
        _.toString(params.ncm).replace(/\D/g, ''), '0',
      );
    });

    if (!ncm) {
      callback({
        ncm: 'NCM não encontrado',
      });

      return;
    }

    callback(null, ncm);
  });

  emitter.on('tribute::all', async (params, callback) => {
    callback(null, JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '..', 'storage', 'tribute.json'),
        'utf8',
      ),
    ));
  });
};
