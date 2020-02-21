const _ = require('lodash');
const fs = require('fs');
const path = require('path');

module.exports = (emitter, models) => {
  emitter.on('ipi::findByIpiOut', async (params, callback) => {
    const ipiList = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '..', 'storage', 'ipi.json'),
        'utf8',
      ),
    );

    callback(null, ipiList.filter((ipiItem) => {
      const ipiOut = _.toString(params.ipiOut);

      if (ipiOut === '02' || ipiOut === '52') {
        return _.parseInt(ipiItem.code) > 300 && _.parseInt(ipiItem.code) < 400;
      }

      if (ipiOut === '04' || ipiOut === '54') {
        return _.parseInt(ipiItem.code) > 0 && _.parseInt(ipiItem.code) < 99;
      }

      if (ipiOut === '05' || ipiOut === '55') {
        return _.parseInt(ipiItem.code) > 100 && _.parseInt(ipiItem.code) < 200;
      }

      return _.parseInt(ipiItem.code) > 600;
    }));
  });

  emitter.on('ipi::all', async (params, callback) => {
    callback(null, JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '..', 'storage', 'ipi.json'),
        'utf8',
      ),
    ));
  });
};
