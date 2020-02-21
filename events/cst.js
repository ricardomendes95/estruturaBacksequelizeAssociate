const fs = require('fs');
const path = require('path');

module.exports = (emitter, models) => {
  emitter.on('cst::findByIssuerTributareSituation', async (params, callback) => {
    const cst = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '..', 'storage', 'cst.json'),
        'utf8',
      ),
    );

    // TODO
    const tributareSituation = 'SIMPLES NACIONAL';

    callback(null, cst.filter((item) => {
      return tributareSituation === 'SIMPLES NACIONAL'
        ? item.cst.length === 3
        : item.cst.length === 2;
    }));
  });

  emitter.on('cst::all', async (params, callback) => {
    callback(null, JSON.parse(
      fs.readFileSync(
        path.join(__dirname, '..', 'storage', 'cst.json'),
        'utf8',
      ),
    ));
  });
};
